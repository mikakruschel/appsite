import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/utils";

type StarProps = {
  className?: string;
};

export function Star({ className }: StarProps) {
  return <Icon id="icon-star" className={cn(className)} />;
}
