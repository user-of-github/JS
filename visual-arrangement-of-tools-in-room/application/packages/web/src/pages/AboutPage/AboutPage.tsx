import React from 'react';
import { FormattedMessage } from 'react-intl';
import { localization } from '@/stores/Localization';
import { AnimatedPage } from '@/components/AnimatedPage';
import { Typography } from '@/components/ui/Typography';
import { Icon } from '@/components/ui/icons';
import { LanguageSwitcher } from '@/pages/AboutPage/components/LanguageSwitcher';

export const AboutPage: React.FC = () => (
  <AnimatedPage className="select-none w-full flex-grow flex flex-col items-center overflow-y-auto">
    <section className="flex flex-col w-full items-center pt-24 px-6 pb-24 bg-neutral-50">
      <div className="max-w-[60%] max-md:max-w-full leading-[40px] text-center mb-10">
        <Typography variant="h1" className="inline font-thin">
          <FormattedMessage id="ui.about.firstParagraph.ordinaryText" />
        </Typography>
        &nbsp;&nbsp;&nbsp;
        <Typography variant="h1" className="inline text-primary-600">
          <FormattedMessage id="ui.about.firstParagraph.primaryText" />
        </Typography>
      </div>

      <Typography variant="paragraph-small" className="max-w-[33%] text-center text-border-main-active">
        <FormattedMessage id="ui.about.description" />
      </Typography>
    </section>

    <section className="flex flex-col w-full items-center pt-24 px-6 pb-24">
      <Typography variant="h2" className="text-primary-700 mb-10 text-center max-w-[60%] max-md:max-w-full">
        <FormattedMessage id="ui.about.usedTechnologies" />
      </Typography>

      <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {technologies.map((tech) => (
          <TechCard
            key={tech.name}
            version={tech.version}
            name={localization.formatMessage(`ui.about.techs.${tech.name}.name`)}
            description={localization.formatMessage(`ui.about.techs.${tech.name}.description`)}
          />
        ))}
      </div>
    </section>

    <section className="flex flex-col w-full pt-24 px-6 pb-24 bg-neutral-50">
      <div className="max-w-[60%] max-md:max-w-full leading-[40px] text-center mb-14 mx-auto">
        <Typography variant="h1" className="inline font-thin">
          <FormattedMessage id="ui.about.contactUsOrdinary" />
        </Typography>
        &nbsp;&nbsp;&nbsp;
        <Typography variant="h1" className="inline text-primary-600">
          <FormattedMessage id="ui.about.contactUsPrimary" />
        </Typography>
      </div>

      <div className="mb-10 mx-auto">
        <Typography variant="h4" className="mx-auto w-full text-center">
          <FormattedMessage id="ui.about.advantages.advantages" />
        </Typography>
        <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 mt-5">
          {advantages.map((item) => (
            <li className="flex items-center gap-x-3" key={item}>
              <Icon iconName="tick" className="stroke-green-500 w-3.5" />
              <FormattedMessage id={`ui.about.advantages.${item}`} />
            </li>
          ))}
        </ul>
      </div>

      <hr />

      <table className="w-fit text-md text-left text-gray-500 mt-10 mx-auto">
        <tbody>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td className="px-6 py-4">GitHub</td>
            <td className="px-6 py-4">
              <a href="github.com/user-of-github" target="_blank">
                @user-of-github
              </a>
            </td>
          </tr>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td className="px-6 py-4">Email</td>
            <td className="px-6 py-4">
              <a href="mailto:slutski.mikita@gmail.com" target="_blank">
                slutski.mikita@gmail.com
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section className="flex flex-col w-full pt-12 px-6 pb-6 items-center">
      <Typography variant="h4" className="font-bold">
        <FormattedMessage id="ui.about.switchLocale" />
      </Typography>

      <LanguageSwitcher className="w-full justify-center mt-10" />
    </section>
  </AnimatedPage>
);

interface TechCardProps {
  name: string;
  version: string;
  description: string;
}

const TechCard: React.FC<TechCardProps> = ({ name, version, description }) => (
  <div className="w-full  bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
    <div className="grid grid-cols-8 gap-5">
      <div className="text-2xl font-bold text-indigo-600 col-span-2">{version}</div>
      <div className="flex-1 col-span-6">
        <h4 className="text-xl text-gray-900 font-semibold mb-2">{name}</h4>
        <p className="text-xs text-gray-500 leading-5">{description}</p>
      </div>
    </div>
  </div>
);

const technologies = [
  { name: 'typescript', version: '5.4' },
  { name: 'react', version: '18' },
  { name: 'reactRouter', version: '6' },
  { name: 'three', version: '0.163' },
  { name: 'mobx', version: '6.12' },
  { name: 'tailwind', version: '3.4' },
  { name: 'vite', version: '5' },
  { name: 'node', version: '20.11' }
] as const;

const advantages = ['accessibility', 'translation', 'versatility', 'integration'] as const;

const contacts = [
  ['GitHub', '@user-of-github'],
  ['E-mail', 'slutski.mikita@gmail.com']
];
