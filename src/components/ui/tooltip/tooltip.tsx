import { Tooltip as ReactTooltip } from 'react-tooltip';
import { GREY_SCALE_COLOR } from '@/constants';

export type TooltipProps = {
  id: string;
};
export const Tooltip = ({ id }: TooltipProps) => {
  return (
    <ReactTooltip
      id={id}
      place='bottom'
      noArrow
      style={{
        color: GREY_SCALE_COLOR[0],
        fontSize: '0.75rem',
        padding: '0.25rem 0.5rem',
        borderRadius: '0.25rem',
        backgroundColor: GREY_SCALE_COLOR[750],
      }}
    />
  );
};
