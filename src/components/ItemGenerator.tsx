
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ItemGeneratorProps {
  itemType: string;
  itemName: string;
  enchantments: Array<{id: string, level: number}>;
  damage: number;
  unbreakable: boolean;
  minecraftVersion: string;
}

export const ItemGenerator = ({
  itemType,
  itemName,
  enchantments,
  damage,
  unbreakable,
  minecraftVersion
}: ItemGeneratorProps) => {
  const [command, setCommand] = useState('');

  const generateCommand = () => {
    let cmd = '';
    if (parseFloat(minecraftVersion) >= 1.13) {
      cmd = `/give @p ${itemType}{`;
      
      const attributes = [];
      
      if (enchantments.length > 0) {
        const enchantList = enchantments.map(e => `{id:"${e.id}",lvl:${e.level}s}`).join(',');
        attributes.push(`Enchantments:[${enchantList}]`);
      }
      
      if (damage > 0) {
        attributes.push(`Damage:${damage}`);
      }
      
      if (unbreakable) {
        attributes.push('Unbreakable:1b');
      }
      
      if (itemName !== '') {
        attributes.push(`display:{Name:'{"text":"${itemName}"}'}`);
      }
      
      cmd += attributes.join(',');
      cmd += '} 1';
    } else {
      // 1.12.2 команда
      cmd = `/give @p ${itemType} 1 ${damage} {`;
      
      const attributes = [];
      
      if (enchantments.length > 0) {
        const enchantList = enchantments.map(e => `{id:${e.id},lvl:${e.level}}`).join(',');
        attributes.push(`ench:[${enchantList}]`);
      }
      
      if (unbreakable) {
        attributes.push('Unbreakable:1');
      }
      
      if (itemName !== '') {
        attributes.push(`display:{Name:"${itemName}"}`);
      }
      
      cmd += attributes.join(',');
      cmd += '}';
    }
    
    setCommand(cmd);
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle>Команда</CardTitle>
      </CardHeader>
      <CardContent>
        {command ? (
          <div className="space-y-4">
            <div className="bg-black p-4 rounded-md overflow-x-auto">
              <code className="text-green-400 break-all">{command}</code>
            </div>
            <Button 
              onClick={() => navigator.clipboard.writeText(command)}
              variant="outline" 
              className="w-full"
            >
              <Icon name="Copy" className="mr-2" size={16} />
              Копировать команду
            </Button>
          </div>
        ) : (
          <div className="text-center text-gray-400 p-4">
            Нажмите на кнопку "Сгенерировать" для создания команды
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={generateCommand} 
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Сгенерировать
        </Button>
      </CardFooter>
    </Card>
  );
};
