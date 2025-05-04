
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface VersionSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const VersionSelector = ({ value, onChange }: VersionSelectorProps) => {
  const versions = [
    '1.12.2', '1.13', '1.14.4', '1.15.2', '1.16.5', 
    '1.17.1', '1.18.2', '1.19.2', '1.19.4', '1.20.1', '1.20.4'
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id="version">
        <SelectValue placeholder="Выберите версию" />
      </SelectTrigger>
      <SelectContent>
        {versions.map((version) => (
          <SelectItem key={version} value={version}>
            {version}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
