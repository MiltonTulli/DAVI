// import { ComponentStory, ComponentMeta } from '@storybook/react';
import colors from './colors';
// type h1 = any;

export default {
  title: 'colors',
  //   component: ProposalVoteCard,
} as any;
// } as ComponentMeta<any>;

const Template = () => {
  return Object.entries(colors).map(([colorName, values]) => {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ul style={{ border: '1px solid white', padding: 8, minWidth: 200 }}>
          <li
            style={{
              listStyle: 'none',
              fontSize: 24,
              marginBottom: 8,
              background: values[500],
              color: colorName === 'white' ? 'black' : 'white',
            }}
          >
            {colorName}
          </li>
          {Object.entries(values).map(([key, value]) => {
            return (
              <li style={{ background: value, listStyle: 'none', height: 40 }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={colorName === 'white' ? { color: 'black' } : {}}>
                    {key}
                  </span>
                  <span style={colorName === 'white' ? { color: 'black' } : {}}>
                    {value}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  });
};

export const Simple = Template.bind({});
