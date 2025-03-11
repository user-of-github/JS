import React from 'react';
import { FormattedMessage } from 'react-intl';
import { observer } from 'mobx-react-lite';
import { Converter } from '@/core/services/Converter';
import { Formatter } from '@/core/services/Formatter';
import { WallCanvasElementLine } from '@/core/types/WallCanvas';
import { calculateDistance } from '@/core/viewer/utils/utilsCanvas';
import { localization } from '@/stores/Localization';
import { Button } from '@/components/ui';
import { Block } from '@/components/ui/Block';
import { Typography } from '@/components/ui/Typography';

interface SelectedWallInfoProps {
  // TODO: it is UI-positioned model, when it will be as layout in configurator Store -- exchange maybe to that
  selectedWall?: WallCanvasElementLine;
  onWallDelete: () => void;
}
export const SelectedWallInfo: React.FC<SelectedWallInfoProps> = observer(({ selectedWall, onWallDelete }) => {
  if (!selectedWall) {
    return <></>;
  }

  const data: InfoRowProps[] = [
    {
      colName: localization.formatMessage('ui.configurator.wallWidth'),
      colValue: `${Formatter.formatFraction(selectedWall.wallThickness)} ${localization.formatMessage('ui.units.mm')}`
    },
    {
      colName: localization.formatMessage('ui.general.starts'),
      colValue:
        `${Formatter.formatFraction(selectedWall.start.x)} ${localization.formatMessage('ui.units.mm')} / ${Formatter.formatFraction(
          selectedWall.start.y
        )} ` + localization.formatMessage('ui.units.mm')
    },
    {
      colName: localization.formatMessage('ui.general.ends'),
      colValue:
        `${Formatter.formatFraction(selectedWall.end.x)} ${localization.formatMessage('ui.units.mm')} / ${Formatter.formatFraction(
          selectedWall.end.y
        )} ` + localization.formatMessage('ui.units.mm')
    },
    {
      colName: localization.formatMessage('ui.general.length'),
      colValue:
        `${Converter.mmToCm(calculateDistance(selectedWall.start, selectedWall.end))}` + localization.formatMessage('ui.units.m')
    }
  ] as const;

  return (
    <Block className="flex flex-col p-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-4">
        <tbody>
          {data.map((row) => (
            <InfoRow colName={row.colName} colValue={row.colValue} key={row.colName} />
          ))}
        </tbody>
      </table>

      <Button
        appearance="flat-red-outlined"
        className="mt-3 w-full py-1 text-center items-center justify-center"
        onClick={onWallDelete}
      >
        <FormattedMessage id="ui.general.remove" />
      </Button>
    </Block>
  );
});

interface InfoRowProps {
  colName: string;
  colValue: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ colName, colValue }) => (
  <tr className="border-b">
    <th scope="row" className="px-2 py-1.5 font-medium text-gray-900 whitespace-nowrap">
      {colName}
    </th>
    <td className="px-2 py-1.5">{colValue}</td>
  </tr>
);
