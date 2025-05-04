
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { ItemGenerator } from '@/components/ItemGenerator';
import { VersionSelector } from '@/components/VersionSelector';

const Index = () => {
  const [minecraftVersion, setMinecraftVersion] = useState('1.19.2');
  const [itemName, setItemName] = useState('Алмазный меч');
  const [itemType, setItemType] = useState('minecraft:diamond_sword');
  const [command, setCommand] = useState('');
  const [enchantments, setEnchantments] = useState<Array<{id: string, level: number}>>([]);
  const [damage, setDamage] = useState(0);
  const [unbreakable, setUnbreakable] = useState(false);

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

  const addEnchantment = (id: string, level: number) => {
    setEnchantments([...enchantments, { id, level }]);
  };

  const removeEnchantment = (index: number) => {
    const newEnchantments = [...enchantments];
    newEnchantments.splice(index, 1);
    setEnchantments(newEnchantments);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Генератор предметов Minecraft</h1>
          <p className="text-gray-300">Создайте свой предмет и получите команду для его создания в игре</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Параметры предмета</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="version">Версия Minecraft</Label>
                  <VersionSelector 
                    value={minecraftVersion} 
                    onChange={setMinecraftVersion} 
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="space-y-2">
                  <Label htmlFor="item-type">Тип предмета</Label>
                  <Select value={itemType} onValueChange={setItemType}>
                    <SelectTrigger id="item-type">
                      <SelectValue placeholder="Выберите тип предмета" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minecraft:diamond_sword">Алмазный меч</SelectItem>
                      <SelectItem value="minecraft:iron_sword">Железный меч</SelectItem>
                      <SelectItem value="minecraft:diamond_pickaxe">Алмазная кирка</SelectItem>
                      <SelectItem value="minecraft:diamond_axe">Алмазный топор</SelectItem>
                      <SelectItem value="minecraft:bow">Лук</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item-name">Название предмета</Label>
                  <Input 
                    id="item-name" 
                    value={itemName} 
                    onChange={(e) => setItemName(e.target.value)} 
                    placeholder="Введите название предмета"
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="damage">Повреждение</Label>
                    <span className="text-sm text-gray-400">{damage}</span>
                  </div>
                  <Slider 
                    id="damage" 
                    min={0} 
                    max={100} 
                    step={1} 
                    value={[damage]} 
                    onValueChange={(values) => setDamage(values[0])} 
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="unbreakable" 
                    checked={unbreakable} 
                    onCheckedChange={setUnbreakable} 
                  />
                  <Label htmlFor="unbreakable">Неразрушимый</Label>
                </div>

                <Tabs defaultValue="enchantments">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="enchantments">Зачарования</TabsTrigger>
                    <TabsTrigger value="attributes">Атрибуты</TabsTrigger>
                  </TabsList>
                  <TabsContent value="enchantments" className="space-y-4 mt-4">
                    <div className="flex flex-col space-y-2">
                      {enchantments.map((enchant, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded-md">
                          <span>{enchant.id} (Уровень: {enchant.level})</span>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => removeEnchantment(index)}
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Select onValueChange={(value) => addEnchantment(value, 1)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Добавить зачарование" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minecraft:sharpness">Острота</SelectItem>
                          <SelectItem value="minecraft:efficiency">Эффективность</SelectItem>
                          <SelectItem value="minecraft:fortune">Удача</SelectItem>
                          <SelectItem value="minecraft:unbreaking">Прочность</SelectItem>
                          <SelectItem value="minecraft:mending">Починка</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                  <TabsContent value="attributes">
                    <div className="p-4 text-center text-gray-400">
                      Атрибуты будут доступны в следующем обновлении
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={generateCommand} 
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Сгенерировать команду
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
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
                    Здесь появится команда после нажатия на кнопку "Сгенерировать команду"
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
