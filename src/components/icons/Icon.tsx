import { cn } from "@/lib/utils";
import { iconViewBoxes, type IconId } from "@/components/icons/sprite-ids";

type IconProps = React.SVGProps<SVGSVGElement> & {
  id: IconId;
  label?: string;
};

export function Icon({ id, className, style, label, ...props }: IconProps) {
  return (
    <svg
      className={cn(className)}
      viewBox={iconViewBoxes[id]}
      style={style}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      {...props}
    >
      <use href={`#${id}`} />
    </svg>
  );
}
