import './styles.scss';
// @ts-ignore
import App from './original/App.jsx';
import type { TemplateProps } from '../../types';

export const RomanticAnimeBirthday: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="romantic-anime-template">
      <App data={data} />
    </div>
  );
};
