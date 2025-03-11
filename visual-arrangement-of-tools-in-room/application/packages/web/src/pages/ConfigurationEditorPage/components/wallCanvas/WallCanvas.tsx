import React from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { CanvasWallElementsCreator } from '@/core/viewer/CanvasWallElementsCreator';
import { RIGHT_MOUSE_BUTTON } from '@/core/viewer/utils/canvasConstants';
import { getCSSCursorPropertyValueForPositionOnHover, getMouseCoordinateTowardsWallCanvasHtml } from '@/core/viewer/utils/utilsCanvas';
import type { ConfiguratorStore } from '@/stores/ConfiguratorStore';
import { WallsEditStore } from '@/stores/walls/WallsEditStore';
import { Tool } from '@/stores/walls/WallsSettingsStore';
import { CanvasContainer, EditorLayout } from '@/pages/ConfigurationEditorPage/components/layout/EditorLayout';
import { PanOffsetInfo } from '@/pages/ConfigurationEditorPage/components/wallCanvas/PanOffsetInfo';
import { ToolSelector } from '@/pages/ConfigurationEditorPage/components/wallCanvas/ToolSelector';
import { SideBar } from '@/pages/ConfigurationEditorPage/components/wallCanvas/sideBar/SideBar';
import { wallCanvasElementsToPositionedWalls, wallsToWallCanvasElements } from '@/pages/ConfigurationEditorPage/utils/utils';

interface CanvasProps {
  configuratorStore: ConfiguratorStore;
}

const canvasId = 'layout-canvas';
const canvasContainerId = 'layout-canvas-container-id';

export const WallCanvas: React.FC<CanvasProps> = observer(({ configuratorStore }) => {
  const { wallsSettingStore: settingsStore } = configuratorStore;

  const [wallsStore] = React.useState<WallsEditStore>(() => new WallsEditStore());
  const [ElementsCreator] = React.useState<CanvasWallElementsCreator>(() => new CanvasWallElementsCreator(settingsStore));

  React.useLayoutEffect(() => {
    const canvasContainer = document.getElementById(canvasContainerId) as HTMLElement;
    const canvasHtmlElement = document.getElementById(canvasId) as HTMLCanvasElement;
    ElementsCreator.init(canvasHtmlElement, canvasContainer);

    const initialWallsDataFromConfiguratorStore = wallsToWallCanvasElements(configuratorStore.walls, ElementsCreator);
    wallsStore.init(initialWallsDataFromConfiguratorStore);

    ElementsCreator.renderCanvasImage(wallsStore.walls, wallsStore.mode);

    const renderDispose = autorun(() => {
      ElementsCreator.renderCanvasImage(wallsStore.walls, wallsStore.mode);
      configuratorStore.updateWallsWithDataFromCanvas(wallCanvasElementsToPositionedWalls(wallsStore.walls));
    });

    const changePanOffsetOnScroll = (event: Event): void => {
      if (event instanceof WheelEvent) {
        settingsStore.setPanOffset({
          x: settingsStore.panOffset.x - event.deltaX / 4,
          y: settingsStore.panOffset.y - event.deltaY / 4
        });
      }
    };

    canvasHtmlElement.addEventListener('wheel', changePanOffsetOnScroll);
    canvasHtmlElement.oncontextmenu = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const onWindowResize = (): void => {
      const keepSelected =
        wallsStore.mode.type !== 'drawing' && wallsStore.mode.type !== 'panning' ? wallsStore.mode.selected : undefined;

      wallsStore.enterOverviewMode(keepSelected);
      ElementsCreator.init(canvasHtmlElement, canvasContainer);
      ElementsCreator.renderCanvasImage(wallsStore.walls, wallsStore.mode);
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      canvasContainer.removeEventListener('wheel', changePanOffsetOnScroll);
      window.removeEventListener('resize', onWindowResize);
      renderDispose();
    };
  }, []);

  React.useEffect(() => {
    ElementsCreator.renderCanvasImage(wallsStore.walls, wallsStore.mode);
  }, [settingsStore.panOffset]);

  const handleMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    const clientCoordinate = getMouseCoordinateTowardsWallCanvasHtml(
      event as unknown as MouseEvent,
      ElementsCreator.canvasHtmlElement,
      settingsStore.panOffset
    );

    if (event.button === RIGHT_MOUSE_BUTTON) {
      event.preventDefault();
      wallsStore.enterPanningMode(clientCoordinate);
      return;
    }

    switch (settingsStore.currentTool) {
      case Tool.Wall: {
        wallsStore.enterDrawingMode();
        const lineStart = ElementsCreator.startWall(clientCoordinate, wallsStore.walls);
        wallsStore.startWall(lineStart);
        break;
      }
      case Tool.Select: {
        const tryFindElement = wallsStore.getItemByPosition(clientCoordinate);
        if (!tryFindElement) {
          wallsStore.enterOverviewMode();
          break;
        }

        if (tryFindElement.type === 'body') {
          // clicked inside wall (not on circled edges)

          wallsStore.enterMovingMode(tryFindElement.wall, {
            x: clientCoordinate.x - tryFindElement.wall.start.x,
            y: clientCoordinate.y - tryFindElement.wall.start.y
          });
        } else if (tryFindElement.type === 'edge') {
          wallsStore.enterResizingMode(tryFindElement.wall, tryFindElement.selectedPoint);
        }

        break;
      }
    }
  };

  const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    const clientCoordinate = getMouseCoordinateTowardsWallCanvasHtml(
      event as unknown as MouseEvent,
      ElementsCreator.canvasHtmlElement,
      settingsStore.panOffset
    );

    if (wallsStore.mode.type === 'panning') {
      event.currentTarget.style.cursor = 'move';

      const deltaX = clientCoordinate.x - wallsStore.mode.startPanMousePosition.x;
      const deltaY = clientCoordinate.y - wallsStore.mode.startPanMousePosition.y;

      settingsStore.setPanOffset({
        x: settingsStore.panOffset.x + deltaX,
        y: settingsStore.panOffset.y + deltaY
      });

      return;
    }

    switch (settingsStore.currentTool) {
      case Tool.Wall: {
        event.currentTarget.style.cursor = 'crosshair';
        if (wallsStore.mode.type !== 'drawing') {
          break;
        }
        // TODO: MOUSE COORDS INSIDE CANVAS

        const line = ElementsCreator.createWall(clientCoordinate, wallsStore.walls);
        wallsStore.continueWall(line);
        break;
      }
      case Tool.Select: {
        switch (wallsStore.mode.type) {
          case 'moving': {
            event.currentTarget.style.cursor = 'grabbing';
            const wall = wallsStore.mode.selected;

            const updatedElement = ElementsCreator.updateWallPosition(
              wall,
              clientCoordinate,
              wallsStore.mode.offsetTowardsElementStart
            );
            wallsStore.exchangeWall(updatedElement);

            break;
          }

          case 'resizing': {
            const wall = wallsStore.mode.selected;

            const updatedElement = ElementsCreator.resizeWall(wall, wallsStore.mode.selectedPoint, clientCoordinate, wallsStore.walls);
            wallsStore.exchangeWall(updatedElement);

            const tryFindElement = wallsStore.getItemByPosition(clientCoordinate);
            event.currentTarget.style.cursor = getCSSCursorPropertyValueForPositionOnHover(tryFindElement);

            break;
          }

          default: {
            const tryFindElement = wallsStore.getItemByPosition(clientCoordinate);
            event.currentTarget.style.cursor = getCSSCursorPropertyValueForPositionOnHover(tryFindElement);
            break;
          }
        }

        break;
      }
    }
  };

  const handleMouseLeave = (): void => {
    if (wallsStore.mode.type !== 'drawing') {
      if (wallsStore.mode.type !== 'panning') {
        wallsStore.enterOverviewMode(wallsStore.mode.selected);
      } else {
        wallsStore.enterOverviewMode();
      }
    }
  };

  const handleMouseUp: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    const type = wallsStore.mode.type;

    const save = (): void => {
      if (type === 'drawing' || type === 'moving' || type === 'resizing') {
        configuratorStore.saveChanges();
      }
    };

    switch (settingsStore.currentTool) {
      case Tool.Wall: {
        wallsStore.leaveOnlyDrawnLines();
        wallsStore.enterOverviewMode();
        break;
      }
      case Tool.Select: {
        if (wallsStore.mode.type !== 'panning' && wallsStore.mode.type !== 'drawing') {
          wallsStore.enterOverviewMode(wallsStore.mode.selected);
        } else {
          wallsStore.enterOverviewMode();
        }

        break;
      }
    }

    save();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLElement> = (event) => {
    const { key } = event;
    switch (key) {
      case 'Backspace':
      case 'Delete':
        wallsStore.removeSelectedWall();
        configuratorStore.saveChanges();
        break;
    }
  };

  return (
    <EditorLayout>
      <SideBar store={wallsStore} settingsStore={settingsStore} />

      <CanvasContainer className="overflow-auto @container/wallcanvascontainer" id={canvasContainerId}>
        <canvas
          className="w-full h-full max-h-full outline-none"
          id={canvasId}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          Walls layout canvas
        </canvas>

        <div className="absolute top-0 left-0 right-0 w-full grid-cols-2 grid @xl/wallcanvascontainer:grid-cols-3 border-b border-b-1 border-b-border-main py-1 bg-white">
          <ToolSelector
            onToolSelect={settingsStore.changeTool}
            currentTool={settingsStore.currentTool}
            className="w-fit h-fit col-start-1 col-end-1 @xl/wallcanvascontainer:col-start-2 @xl/wallcanvascontainer:col-end-2 justify-self-center self-center"
          />

          <PanOffsetInfo
            panOffset={settingsStore.panOffset}
            onClick={settingsStore.resetPanOffset}
            className="w-fit h-fit col-start-2 col-end-2 @xl/wallcanvascontainer:col-start-3 @xl/wallcanvascontainer:col-end-3 justify-self-end self-center"
          />
        </div>
      </CanvasContainer>
    </EditorLayout>
  );
});
