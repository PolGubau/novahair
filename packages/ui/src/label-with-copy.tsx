import { CopyButton } from './copy-button';

type Props = {
  label: string;
  textToCopy?: string;
};

export const LabelWithCopy = (  { label, textToCopy=label }: Props) => {
  return (
    <div className="flex gap-2 items-center group">
    {label}
    <CopyButton
      text={textToCopy}
      size="sm"
      variant="ghost"
      className="opacity-0 group-hover:opacity-100 transition-opacity"
    />
  </div>  )
}
