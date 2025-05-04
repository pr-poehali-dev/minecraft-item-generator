
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { VersionSelector } from '@/components/VersionSelector';

export const ItemGenerator = () => {
  const [minecraftVersion, setMinecraftVersion] = useState('1.19.2');
  const [itemName, setItemName] = useState('Легендарный меч');
  const [itemType, setItemType] = useState('minecraft:diamond_sword');
  const [command, setCommand] = useState('');
  const [enchantments, setEnchantments] = useState<Array<{id: string, level: number}>>([]);
  const [damage, setDamage] = useState(0);
  const [unbreakable, setUnbreakable] = useState(false);
  const [customColor, setCustomColor] = useState('');
  const [lore, setLore] = useState('');
  const [glowing, setGlowing] = useState(false);
  const [hideFlags, setHideFlags] = useState(false);
  const [tempEnchantId, setTempEnchantId] = useState('');
  const [tempEnchantLevel, setTempEnchantLevel] = useState(1);
  
  // Справочник предметов по категориям
  const itemCategories = {
    weapons: [
      { id: 'minecraft:diamond_sword', name: 'Алмазный меч' },
      { id: 'minecraft:netherite_sword', name: 'Незеритовый меч' },
      { id: 'minecraft:iron_sword', name: 'Железный меч' },
      { id: 'minecraft:golden_sword', name: 'Золотой меч' },
      { id: 'minecraft:wooden_sword', name: 'Деревянный меч' },
      { id: 'minecraft:bow', name: 'Лук' },
      { id: 'minecraft:crossbow', name: 'Арбалет' },
      { id: 'minecraft:trident', name: 'Трезубец' },
    ],
    tools: [
      { id: 'minecraft:diamond_pickaxe', name: 'Алмазная кирка' },
      { id: 'minecraft:netherite_pickaxe', name: 'Незеритовая кирка' },
      { id: 'minecraft:diamond_axe', name: 'Алмазный топор' },
      { id: 'minecraft:diamond_shovel', name: 'Алмазная лопата' },
      { id: 'minecraft:diamond_hoe', name: 'Алмазная мотыга' },
      { id: 'minecraft:fishing_rod', name: 'Удочка' },
      { id: 'minecraft:shears', name: 'Ножницы' },
      { id: 'minecraft:flint_and_steel', name: 'Огниво' },
    ],
    armor: [
      { id: 'minecraft:diamond_helmet', name: 'Алмазный шлем' },
      { id: 'minecraft:diamond_chestplate', name: 'Алмазный нагрудник' },
      { id: 'minecraft:diamond_leggings', name: 'Алмазные поножи' },
      { id: 'minecraft:diamond_boots', name: 'Алмазные ботинки' },
      { id: 'minecraft:netherite_helmet', name: 'Незеритовый шлем' },
      { id: 'minecraft:netherite_chestplate', name: 'Незеритовый нагрудник' },
      { id: 'minecraft:turtle_helmet', name: 'Панцирь черепахи' },
      { id: 'minecraft:elytra', name: 'Элитры' },
    ],
    special: [
      { id: 'minecraft:totem_of_undying', name: 'Тотем бессмертия' },
      { id: 'minecraft:shield', name: 'Щит' },
      { id: 'minecraft:enchanted_book', name: 'Зачарованная книга' },
      { id: 'minecraft:nether_star', name: 'Звезда Ада' },
      { id: 'minecraft:dragon_egg', name: 'Яйцо дракона' },
      { id: 'minecraft:command_block', name: 'Командный блок' },
      { id: 'minecraft:structure_block', name: 'Структурный блок' },
      { id: 'minecraft:barrier', name: 'Барьер' },
    ]
  };

  // Справочник всех зачарований
  const enchantmentsList = [
    { id: 'minecraft:sharpness', name: 'Острота', maxLevel: 5 },
    { id: 'minecraft:smite', name: 'Небесная кара', maxLevel: 5 },
    { id: 'minecraft:bane_of_arthropods', name: 'Гибель насекомых', maxLevel: 5 },
    { id: 'minecraft:knockback', name: 'Отбрасывание', maxLevel: 2 },
    { id: 'minecraft:fire_aspect', name: 'Заговор огня', maxLevel: 2 },
    { id: 'minecraft:looting', name: 'Добыча', maxLevel: 3 },
    { id: 'minecraft:sweeping', name: 'Разящий клинок', maxLevel: 3 },
    { id: 'minecraft:efficiency', name: 'Эффективность', maxLevel: 5 },
    { id: 'minecraft:silk_touch', name: 'Шёлковое касание', maxLevel: 1 },
    { id: 'minecraft:unbreaking', name: 'Прочность', maxLevel: 3 },
    { id: 'minecraft:fortune', name: 'Удача', maxLevel: 3 },
    { id: 'minecraft:power', name: 'Сила', maxLevel: 5 },
    { id: 'minecraft:punch', name: 'Откидывание', maxLevel: 2 },
    { id: 'minecraft:flame', name: 'Пламя', maxLevel: 1 },
    { id: 'minecraft:infinity', name: 'Бесконечность', maxLevel: 1 },
    { id: 'minecraft:mending', name: 'Починка', maxLevel: 1 },
    { id: 'minecraft:curse_of_vanishing', name: 'Проклятье утраты', maxLevel: 1 },
    { id: 'minecraft:curse_of_binding', name: 'Проклятье несъёмности', maxLevel: 1 },
    { id: 'minecraft:protection', name: 'Защита', maxLevel: 4 },
    { id: 'minecraft:fire_protection', name: 'Огнеупорность', maxLevel: 4 },
    { id: 'minecraft:feather_falling', name: 'Невесомость', maxLevel: 4 },
    { id: 'minecraft:blast_protection', name: 'Взрывоустойчивость', maxLevel: 4 },
    { id: 'minecraft:projectile_protection', name: 'Защита от снарядов', maxLevel: 4 },
    { id: 'minecraft:respiration', name: 'Подводное дыхание', maxLevel: 3 },
    { id: 'minecraft:aqua_affinity', name: 'Родство с водой', maxLevel: 1 },
    { id: 'minecraft:thorns', name: 'Шипы', maxLevel: 3 },
    { id: 'minecraft:depth_strider', name: 'Подводная ходьба', maxLevel: 3 },
    { id: 'minecraft:frost_walker', name: 'Ледоход', maxLevel: 2 },
    { id: 'minecraft:soul_speed', name: 'Скорость души', maxLevel: 3 },
    { id: 'minecraft:swift_sneak', name: 'Быстрое приседание', maxLevel: 3 },
    { id: 'minecraft:loyalty', name: 'Верность', maxLevel: 3 },
    { id: 'minecraft:impaling', name: 'Пронзатель', maxLevel: 5 },
    { id: 'minecraft:riptide', name: 'Тягун', maxLevel: 3 },
    { id: 'minecraft:channeling', name: 'Громовержец', maxLevel: 1 },
    { id: 'minecraft:multishot', name: 'Тройной выстрел', maxLevel: 1 },
    { id: 'minecraft:quick_charge', name: 'Быстрая перезарядка', maxLevel: 3 },
    { id: 'minecraft:piercing', name: 'Пробивание', maxLevel: 4 },
  ];

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
      
      const displayAttributes = [];
      if (itemName !== '') {
        displayAttributes.push(`Name:'{"text":"${itemName}","italic":false}'`);
      }
      
      if (lore !== '') {
        displayAttributes.push(`Lore:['{"text":"${lore}","italic":false,"color":"gray"}']`);
      }
      
      if (customColor !== '') {
        displayAttributes.push(`color:${customColor.replace('#', '')}`);
      }
      
      if (displayAttributes.length > 0) {
        attributes.push(`display:{${displayAttributes.join(',')}}`);
      }
      
      if (hideFlags) {
        attributes.push('HideFlags:127');
      }
      
      if (glowing && enchantments.length === 0) {
        attributes.push('Enchantments:[{}]');
        if (hideFlags) {
          const flagIndex = attributes.findIndex(a => a.startsWith('HideFlags'));
          if (flagIndex !== -1) {
            attributes[flagIndex] = 'HideFlags:127';
          } else {
            attributes.push('HideFlags:127');
          }
        }
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
      
      const displayAttributes = [];
      if (itemName !== '') {
        displayAttributes.push(`Name:"${itemName}"`);
      }
      
      if (lore !== '') {
        displayAttributes.push(`Lore:["${lore}"]`);
      }
      
      if (customColor !== '') {
        displayAttributes.push(`color:${customColor.replace('#', '')}`);
      }
      
      if (displayAttributes.length > 0) {
        attributes.push(`display:{${displayAttributes.join(',')}}`);
      }
      
      if (hideFlags) {
        attributes.push('HideFlags:127');
      }
      
      if (glowing && enchantments.length === 0) {
        attributes.push('ench:[{id:0,lvl:0}]');
        if (hideFlags) {
          const flagIndex = attributes.findIndex(a => a.startsWith('HideFlags'));
          if (flagIndex !== -1) {
            attributes[flagIndex] = 'HideFlags:127';
          } else {
            attributes.push('HideFlags:127');
          }
        }
      }
      
      cmd += attributes.join(',');
      cmd += '}';
    }
    
    setCommand(cmd);
  };

  const addEnchantment = () => {
    if (!tempEnchantId) return;
    
    const enchantment = enchantmentsList.find(e => e.id === tempEnchantId);
    if (!enchantment) return;
    
    // Проверка корректности уровня зачарования
    let level = tempEnchantLevel;
    if (level < 1) level = 1;
    if (level > enchantment.maxLevel) level = enchantment.maxLevel;
    
    // Проверяем, есть ли уже такое зачарование
    const existingIndex = enchantments.findIndex(e => e.id === tempEnchantId);
    if (existingIndex !== -1) {
      // Если есть - заменяем
      const newEnchantments = [...enchantments];
      newEnchantments[existingIndex].level = level;
      setEnchantments(newEnchantments);
    } else {
      // Если нет - добавляем новое
      setEnchantments([...enchantments, { id: tempEnchantId, level }]);
    }
    
    // Сбрасываем временные значения
    setTempEnchantId('');
    setTempEnchantLevel(1);
  };

  const removeEnchantment = (index: number) => {
    const newEnchantments = [...enchantments];
    newEnchantments.splice(index, 1);
    setEnchantments(newEnchantments);
  };

  const selectEnchantForLevel = (id: string) => {
    setTempEnchantId(id);
    const enchantment = enchantmentsList.find(e => e.id === id);
    if (enchantment) {
      setTempEnchantLevel(1); // По умолчанию начинаем с 1 уровня
    }
  };

  return (
    <Card className="bg-gray-800/80 border-gray-700 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-2xl flex items-center">
          <Icon name="Sword" className="mr-2 text-purple-400" size={24} />
          Генератор предметов
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="version">Версия Minecraft</Label>
                <VersionSelector 
                  value={minecraftVersion} 
                  onChange={setMinecraftVersion} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-name">Название предмета</Label>
                <Input 
                  id="item-name" 
                  value={itemName} 
                  onChange={(e) => setItemName(e.target.value)} 
                  placeholder="Введите название предмета"
                  className="bg-gray-900 border-gray-700 text-gray-100"
                />
              </div>
            </div>

            <Separator className="bg-gray-700" />

            <div className="space-y-3">
              <Label>Выберите тип предмета</Label>
              
              <Tabs defaultValue="weapons" className="w-full">
                <TabsList className="grid grid-cols-4 bg-gray-900/70">
                  <TabsTrigger value="weapons">Оружие</TabsTrigger>
                  <TabsTrigger value="tools">Инструменты</TabsTrigger>
                  <TabsTrigger value="armor">Броня</TabsTrigger>
                  <TabsTrigger value="special">Особые</TabsTrigger>
                </TabsList>
                
                {Object.entries(itemCategories).map(([category, items]) => (
                  <TabsContent key={category} value={category} className="mt-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {items.map(item => (
                        <Button
                          key={item.id}
                          variant={itemType === item.id ? "default" : "outline"}
                          className={`h-auto py-2 px-3 justify-start ${itemType === item.id ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-900 hover:bg-gray-800 border-gray-700'}`}
                          onClick={() => setItemType(item.id)}
                        >
                          <span className="text-sm truncate">{item.name}</span>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            <Separator className="bg-gray-700" />

            <Tabs defaultValue="enchantments">
              <TabsList className="grid w-full grid-cols-3 bg-gray-900/70">
                <TabsTrigger value="enchantments">Зачарования</TabsTrigger>
                <TabsTrigger value="appearance">Внешний вид</TabsTrigger>
                <TabsTrigger value="advanced">Доп. настройки</TabsTrigger>
              </TabsList>
              
              <TabsContent value="enchantments" className="space-y-4 mt-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {enchantments.map((enchant, index) => {
                    const enchantInfo = enchantmentsList.find(e => e.id === enchant.id);
                    return (
                      <Badge 
                        key={index} 
                        className="py-1.5 px-3 text-sm bg-indigo-600 hover:bg-indigo-700"
                      >
                        <span>{enchantInfo?.name || enchant.id} {enchant.level}</span>
                        <button 
                          className="ml-2 text-indigo-200 hover:text-white"
                          onClick={() => removeEnchantment(index)}
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </Badge>
                    );
                  })}
                  {enchantments.length === 0 && (
                    <p className="text-gray-400 text-sm">Нет зачарований. Добавьте зачарования из списка ниже.</p>
                  )}
                </div>
                
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 mb-4">
                  <h3 className="text-lg font-medium mb-3">Добавить зачарование</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label className="mb-1 block">Выберите зачарование</Label>
                      <Select value={tempEnchantId} onValueChange={selectEnchantForLevel}>
                        <SelectTrigger className="bg-gray-900 border-gray-700">
                          <SelectValue placeholder="Выберите зачарование" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 max-h-80">
                          {enchantmentsList.map(enchant => (
                            <SelectItem key={enchant.id} value={enchant.id}>
                              {enchant.name} (макс. {enchant.maxLevel})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="mb-1 block">Уровень зачарования</Label>
                      <div className="flex items-center space-x-3">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="bg-gray-900 border-gray-700 h-10 w-10"
                          onClick={() => setTempEnchantLevel(prev => Math.max(1, prev - 1))}
                          disabled={tempEnchantLevel <= 1}
                        >
                          <Icon name="Minus" size={16} />
                        </Button>
                        
                        <Input 
                          type="number" 
                          value={tempEnchantLevel}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val)) {
                              setTempEnchantLevel(val);
                            }
                          }}
                          min={1}
                          max={tempEnchantId ? enchantmentsList.find(e => e.id === tempEnchantId)?.maxLevel || 5 : 5}
                          className="bg-gray-900 border-gray-700 text-center"
                        />
                        
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="bg-gray-900 border-gray-700 h-10 w-10"
                          onClick={() => {
                            const maxLevel = tempEnchantId ? 
                              enchantmentsList.find(e => e.id === tempEnchantId)?.maxLevel || 5 : 5;
                            setTempEnchantLevel(prev => Math.min(maxLevel, prev + 1));
                          }}
                          disabled={!tempEnchantId || tempEnchantLevel >= (enchantmentsList.find(e => e.id === tempEnchantId)?.maxLevel || 5)}
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-end">
                      <Button 
                        onClick={addEnchantment}
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                        disabled={!tempEnchantId}
                      >
                        <Icon name="Plus" className="mr-2" size={16} />
                        Добавить зачарование
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Tabs defaultValue="battle">
                  <TabsList className="grid grid-cols-4 bg-gray-900/70">
                    <TabsTrigger value="battle">Боевые</TabsTrigger>
                    <TabsTrigger value="protection">Защитные</TabsTrigger>
                    <TabsTrigger value="tool">Инструменты</TabsTrigger>
                    <TabsTrigger value="special">Специальные</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="battle" className="mt-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {enchantmentsList.filter(e => 
                        ['sharpness', 'smite', 'bane_of_arthropods', 'knockback', 'fire_aspect', 'looting', 'sweeping', 'power', 'punch', 'flame', 'infinity']
                        .some(id => e.id.includes(id))
                      ).map(enchant => (
                        <Button
                          key={enchant.id}
                          variant="outline"
                          size="sm"
                          className="justify-start bg-gray-900 hover:bg-gray-800 border-gray-700"
                          onClick={() => selectEnchantForLevel(enchant.id)}
                        >
                          <span className="text-xs truncate">{enchant.name}</span>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="protection" className="mt-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {enchantmentsList.filter(e => 
                        ['protection', 'fire_protection', 'feather_falling', 'blast_protection', 'projectile_protection', 'respiration', 'aqua_affinity', 'thorns']
                        .some(id => e.id.includes(id))
                      ).map(enchant => (
                        <Button
                          key={enchant.id}
                          variant="outline"
                          size="sm"
                          className="justify-start bg-gray-900 hover:bg-gray-800 border-gray-700"
                          onClick={() => selectEnchantForLevel(enchant.id)}
                        >
                          <span className="text-xs truncate">{enchant.name}</span>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tool" className="mt-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {enchantmentsList.filter(e => 
                        ['efficiency', 'silk_touch', 'unbreaking', 'fortune', 'mending']
                        .some(id => e.id.includes(id))
                      ).map(enchant => (
                        <Button
                          key={enchant.id}
                          variant="outline"
                          size="sm"
                          className="justify-start bg-gray-900 hover:bg-gray-800 border-gray-700"
                          onClick={() => selectEnchantForLevel(enchant.id)}
                        >
                          <span className="text-xs truncate">{enchant.name}</span>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="special" className="mt-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {enchantmentsList.filter(e => 
                        ['curse', 'depth_strider', 'frost_walker', 'soul_speed', 'swift_sneak', 'loyalty', 'impaling', 'riptide', 'channeling', 'multishot', 'quick_charge', 'piercing']
                        .some(id => e.id.includes(id))
                      ).map(enchant => (
                        <Button
                          key={enchant.id}
                          variant="outline"
                          size="sm"
                          className="justify-start bg-gray-900 hover:bg-gray-800 border-gray-700"
                          onClick={() => selectEnchantForLevel(enchant.id)}
                        >
                          <span className="text-xs truncate">{enchant.name}</span>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-6 mt-4">
                <div className="space-y-3">
                  <Label htmlFor="item-lore">Описание предмета (Lore)</Label>
                  <Input 
                    id="item-lore" 
                    value={lore} 
                    onChange={(e) => setLore(e.target.value)} 
                    placeholder="Добавьте лор для предмета"
                    className="bg-gray-900 border-gray-700 text-gray-100"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="custom-color">Цвет предмета (для брони из кожи, щитов)</Label>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="color" 
                      id="custom-color" 
                      value={customColor} 
                      onChange={(e) => setCustomColor(e.target.value)} 
                      className="h-10 w-14 bg-transparent border-0"
                    />
                    <Input 
                      value={customColor} 
                      onChange={(e) => setCustomColor(e.target.value)} 
                      placeholder="#RRGGBB" 
                      className="bg-gray-900 border-gray-700 text-gray-100 w-32"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-gray-900 border-gray-700" 
                      onClick={() => setCustomColor('')}
                    >
                      Сбросить
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="glowing" 
                    checked={glowing} 
                    onCheckedChange={setGlowing} 
                  />
                  <Label htmlFor="glowing">Свечение (без зачарований)</Label>
                </div>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-6 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="damage">Повреждение предмета</Label>
                    <span className="text-sm text-gray-400">{damage}</span>
                  </div>
                  <Slider 
                    id="damage" 
                    min={0} 
                    max={100} 
                    step={1} 
                    value={[damage]} 
                    onValueChange={(values) => setDamage(values[0])} 
                    className="bg-gray-900"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="unbreakable" 
                    checked={unbreakable} 
                    onCheckedChange={setUnbreakable} 
                  />
                  <Label htmlFor="unbreakable">Неразрушимый предмет</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="hide-flags" 
                    checked={hideFlags} 
                    onCheckedChange={setHideFlags} 
                  />
                  <Label htmlFor="hide-flags">Скрыть флаги (зачарования, атрибуты)</Label>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="bg-gray-900/80 border-gray-700">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-xl">Команда</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {command ? (
                  <div className="space-y-4">
                    <div className="bg-black p-4 rounded-md overflow-x-auto">
                      <code className="text-green-400 break-all">{command}</code>
                    </div>
                    <Button 
                      onClick={() => navigator.clipboard.writeText(command)}
                      variant="outline" 
                      className="w-full bg-gray-800 hover:bg-gray-700 border-gray-600"
                    >
                      <Icon name="Copy" className="mr-2" size={16} />
                      Копировать команду
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center text-gray-400 p-4 space-y-3">
                    <Icon name="CommandLine" size={48} className="text-gray-500" />
                    <p>Здесь появится команда после нажатия на кнопку "Сгенерировать команду"</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t border-gray-700 p-4">
                <Button 
                  onClick={generateCommand} 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  <Icon name="Wand" className="mr-2" size={18} />
                  Сгенерировать команду
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-4 bg-blue-900/30 rounded-lg border border-blue-800/50 p-4">
              <h3 className="text-lg font-medium flex items-center">
                <Icon name="InfoIcon" className="mr-2 text-blue-400" size={18} />
                Советы
              </h3>
              <ul className="mt-2 text-sm text-gray-300 space-y-1">
                <li>• Версия влияет на формат команды</li>
                <li>• Не все зачарования совместимы друг с другом</li>
                <li>• Цвет работает только для кожаной брони и щитов</li>
                <li>• Для творческого режима используйте /give</li>
                <li>• Для выживания - вставьте команду в командный блок</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
