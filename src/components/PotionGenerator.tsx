
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { VersionSelector } from '@/components/VersionSelector';

export const PotionGenerator = () => {
  const [minecraftVersion, setMinecraftVersion] = useState('1.19.2');
  const [potionType, setPotionType] = useState('minecraft:potion');
  const [potionName, setPotionName] = useState('Зелье силы');
  const [command, setCommand] = useState('');
  const [effects, setEffects] = useState<Array<{id: string, duration: number, amplifier: number}>>([]);
  const [customColor, setCustomColor] = useState('#FF0000');
  
  // Списки типов зелий и эффектов
  const potionTypes = [
    { id: 'minecraft:potion', name: 'Обычное зелье' },
    { id: 'minecraft:splash_potion', name: 'Взрывное зелье' },
    { id: 'minecraft:lingering_potion', name: 'Туманное зелье' },
    { id: 'minecraft:tipped_arrow', name: 'Стрела с эффектом' },
  ];
  
  const potionEffects = [
    { id: 'minecraft:strength', name: 'Сила', maxAmplifier: 255, defaultDuration: 3600 },
    { id: 'minecraft:speed', name: 'Скорость', maxAmplifier: 255, defaultDuration: 3600 },
    { id: 'minecraft:haste', name: 'Проворство', maxAmplifier: 255, defaultDuration: 3600 },
    { id: 'minecraft:jump_boost', name: 'Прыгучесть', maxAmplifier: 255, defaultDuration: 3600 },
    { id: 'minecraft:regeneration', name: 'Регенерация', maxAmplifier: 255, defaultDuration: 900 },
    { id: 'minecraft:fire_resistance', name: 'Огнестойкость', maxAmplifier: 0, defaultDuration: 3600 },
    { id: 'minecraft:water_breathing', name: 'Подводное дыхание', maxAmplifier: 0, defaultDuration: 3600 },
    { id: 'minecraft:invisibility', name: 'Невидимость', maxAmplifier: 0, defaultDuration: 3600 },
    { id: 'minecraft:night_vision', name: 'Ночное зрение', maxAmplifier: 0, defaultDuration: 3600 },
    { id: 'minecraft:health_boost', name: 'Прилив здоровья', maxAmplifier: 255, defaultDuration: 3600 },
    { id: 'minecraft:absorption', name: 'Поглощение', maxAmplifier: 255, defaultDuration: 3600 },
    { id: 'minecraft:saturation', name: 'Насыщение', maxAmplifier: 255, defaultDuration: 3600 },
    { id: 'minecraft:glowing', name: 'Свечение', maxAmplifier: 0, defaultDuration: 1200 },
    { id: 'minecraft:levitation', name: 'Левитация', maxAmplifier: 255, defaultDuration: 200 },
    { id: 'minecraft:luck', name: 'Удача', maxAmplifier: 255, defaultDuration: 6000 },
    { id: 'minecraft:slow_falling', name: 'Замедленное падение', maxAmplifier: 0, defaultDuration: 1600 },
    { id: 'minecraft:conduit_power', name: 'Сила источника', maxAmplifier: 0, defaultDuration: 3600 },
    { id: 'minecraft:dolphins_grace', name: 'Грация дельфина', maxAmplifier: 0, defaultDuration: 1200 },
    { id: 'minecraft:hero_of_the_village', name: 'Герой деревни', maxAmplifier: 0, defaultDuration: 6000 },
    { id: 'minecraft:bad_omen', name: 'Дурное знамение', maxAmplifier: 4, defaultDuration: 6000 },
    { id: 'minecraft:slowness', name: 'Замедление', maxAmplifier: 255, defaultDuration: 1800 },
    { id: 'minecraft:mining_fatigue', name: 'Утомление', maxAmplifier: 255, defaultDuration: 1800 },
    { id: 'minecraft:nausea', name: 'Тошнота', maxAmplifier: 0, defaultDuration: 300 },
    { id: 'minecraft:blindness', name: 'Слепота', maxAmplifier: 0, defaultDuration: 400 },
    { id: 'minecraft:hunger', name: 'Голод', maxAmplifier: 255, defaultDuration: 900 },
    { id: 'minecraft:weakness', name: 'Слабость', maxAmplifier: 255, defaultDuration: 1800 },
    { id: 'minecraft:poison', name: 'Отравление', maxAmplifier: 255, defaultDuration: 900 },
    { id: 'minecraft:wither', name: 'Иссушение', maxAmplifier: 255, defaultDuration: 600 },
    { id: 'minecraft:instant_damage', name: 'Урон', maxAmplifier: 255, defaultDuration: 1 },
    { id: 'minecraft:instant_health', name: 'Лечение', maxAmplifier: 255, defaultDuration: 1 },
  ];

  const generateCommand = () => {
    let cmd = '';
    
    if (parseFloat(minecraftVersion) >= 1.13) {
      cmd = `/give @p ${potionType}{`;
      
      const attributes = [];
      
      if (potionName !== '') {
        attributes.push(`display:{Name:'{"text":"${potionName}","italic":false}'}`);
      }
      
      if (effects.length > 0) {
        const customEffects = effects.map(effect => 
          `{id:"${effect.id}",Duration:${effect.duration},Amplifier:${effect.amplifier}b,ShowParticles:1b}`
        ).join(',');
        
        attributes.push(`CustomPotionEffects:[${customEffects}]`);
      }
      
      // Цвет зелья (убрал # из начала)
      attributes.push(`CustomPotionColor:${parseInt(customColor.replace('#', ''), 16)}`);
      
      cmd += attributes.join(',');
      cmd += '} 1';
    } else {
      // 1.12.2 команда для зелий
      cmd = `/give @p ${potionType} 1 0 {`;
      
      const attributes = [];
      
      if (potionName !== '') {
        attributes.push(`display:{Name:"${potionName}"}`);
      }
      
      if (effects.length > 0) {
        const customEffects = effects.map(effect => 
          `{Id:${getEffectId(effect.id)},Duration:${effect.duration},Amplifier:${effect.amplifier},ShowParticles:1}`
        ).join(',');
        
        attributes.push(`CustomPotionEffects:[${customEffects}]`);
      }
      
      attributes.push(`CustomPotionColor:${parseInt(customColor.replace('#', ''), 16)}`);
      
      cmd += attributes.join(',');
      cmd += '}';
    }
    
    setCommand(cmd);
  };

  // Числовые ID для 1.12.2 (упрощенно, не все эффекты есть в 1.12.2)
  const getEffectId = (id: string): number => {
    const effectIdMap: {[key: string]: number} = {
      'minecraft:speed': 1,
      'minecraft:slowness': 2,
      'minecraft:haste': 3,
      'minecraft:mining_fatigue': 4,
      'minecraft:strength': 5,
      'minecraft:instant_health': 6,
      'minecraft:instant_damage': 7,
      'minecraft:jump_boost': 8,
      'minecraft:nausea': 9,
      'minecraft:regeneration': 10,
      'minecraft:resistance': 11,
      'minecraft:fire_resistance': 12,
      'minecraft:water_breathing': 13,
      'minecraft:invisibility': 14,
      'minecraft:blindness': 15,
      'minecraft:night_vision': 16,
      'minecraft:hunger': 17,
      'minecraft:weakness': 18,
      'minecraft:poison': 19,
      'minecraft:wither': 20,
      'minecraft:health_boost': 21,
      'minecraft:absorption': 22,
      'minecraft:saturation': 23,
      'minecraft:glowing': 24,
      'minecraft:levitation': 25,
      'minecraft:luck': 26,
      'minecraft:unluck': 27,
    };
    
    return effectIdMap[id] || 1; // По умолчанию 1 (speed)
  };

  const addEffect = (id: string) => {
    const effect = potionEffects.find(e => e.id === id);
    if (!effect) return;
    
    // Проверяем, есть ли уже такой эффект
    const existingIndex = effects.findIndex(e => e.id === id);
    if (existingIndex !== -1) {
      // Если есть - увеличиваем уровень
      const newEffects = [...effects];
      const currentAmplifier = newEffects[existingIndex].amplifier;
      
      if (currentAmplifier < effect.maxAmplifier) {
        newEffects[existingIndex].amplifier = currentAmplifier + 1;
        setEffects(newEffects);
      }
    } else {
      // Если нет - добавляем новый
      setEffects([...effects, { 
        id, 
        duration: effect.defaultDuration, 
        amplifier: 0 // Начальный уровень эффекта (0 = I, 1 = II и т.д.)
      }]);
    }
  };

  const removeEffect = (index: number) => {
    const newEffects = [...effects];
    newEffects.splice(index, 1);
    setEffects(newEffects);
  };

  const updateEffectDuration = (index: number, duration: number) => {
    const newEffects = [...effects];
    newEffects[index].duration = duration;
    setEffects(newEffects);
  };

  return (
    <Card className="bg-gray-800/80 border-gray-700 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-2xl flex items-center">
          <Icon name="Flask" className="mr-2 text-green-400" size={24} />
          Генератор зелий
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
                <Label htmlFor="potion-name">Название зелья</Label>
                <Input 
                  id="potion-name" 
                  value={potionName} 
                  onChange={(e) => setPotionName(e.target.value)} 
                  placeholder="Введите название зелья"
                  className="bg-gray-900 border-gray-700 text-gray-100"
                />
              </div>
            </div>

            <Separator className="bg-gray-700" />

            <div className="space-y-3">
              <Label>Тип контейнера</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {potionTypes.map(type => (
                  <Button
                    key={type.id}
                    variant={potionType === type.id ? "default" : "outline"}
                    className={`h-auto py-2 px-3 justify-start ${potionType === type.id ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-900 hover:bg-gray-800 border-gray-700'}`}
                    onClick={() => setPotionType(type.id)}
                  >
                    <span className="text-sm truncate">{type.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator className="bg-gray-700" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Эффекты зелья</Label>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="custom-color" className="text-sm">Цвет зелья:</Label>
                  <input 
                    type="color" 
                    id="custom-color" 
                    value={customColor} 
                    onChange={(e) => setCustomColor(e.target.value)} 
                    className="h-6 w-10 bg-transparent border-0"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {effects.map((effect, index) => {
                  const effectInfo = potionEffects.find(e => e.id === effect.id);
                  return (
                    <div key={index} className="flex flex-col p-2 bg-gray-900 rounded-md border border-gray-700 w-full">
                      <div className="flex items-center justify-between">
                        <Badge className="py-1 px-2 bg-green-700">
                          {effectInfo?.name || effect.id} {effect.amplifier + 1}
                        </Badge>
                        <button 
                          className="text-gray-400 hover:text-gray-200"
                          onClick={() => removeEffect(index)}
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>Длительность: {(effect.duration / 20).toFixed(1)} сек</span>
                          <span>{effect.duration} тиков</span>
                        </div>
                        <Slider 
                          min={1} 
                          max={effect.id.includes('instant') ? 1 : 72000} 
                          step={20} 
                          value={[effect.duration]} 
                          onValueChange={(values) => updateEffectDuration(index, values[0])} 
                          className="mt-1 bg-gray-800"
                        />
                      </div>
                    </div>
                  );
                })}
                {effects.length === 0 && (
                  <p className="text-gray-400 text-sm">Нет эффектов. Добавьте эффекты из списка ниже.</p>
                )}
              </div>
              
              <Tabs defaultValue="positive">
                <TabsList className="grid w-full grid-cols-2 bg-gray-900/70">
                  <TabsTrigger value="positive">Положительные</TabsTrigger>
                  <TabsTrigger value="negative">Отрицательные</TabsTrigger>
                </TabsList>
                
                <TabsContent value="positive" className="mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {potionEffects.filter(effect => 
                      !['slowness', 'mining_fatigue', 'nausea', 'blindness', 'hunger', 'weakness', 'poison', 'wither', 'instant_damage', 'bad_omen']
                      .some(id => effect.id.includes(id))
                    ).map(effect => (
                      <Button
                        key={effect.id}
                        variant="outline"
                        size="sm"
                        className="justify-start bg-gray-900 hover:bg-gray-800 border-gray-700"
                        onClick={() => addEffect(effect.id)}
                      >
                        <span className="text-xs truncate">{effect.name}</span>
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="negative" className="mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {potionEffects.filter(effect => 
                      ['slowness', 'mining_fatigue', 'nausea', 'blindness', 'hunger', 'weakness', 'poison', 'wither', 'instant_damage', 'bad_omen']
                      .some(id => effect.id.includes(id))
                    ).map(effect => (
                      <Button
                        key={effect.id}
                        variant="outline"
                        size="sm"
                        className="justify-start bg-gray-900 hover:bg-gray-800 border-gray-700"
                        onClick={() => addEffect(effect.id)}
                      >
                        <span className="text-xs truncate">{effect.name}</span>
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
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
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                >
                  <Icon name="Flask" className="mr-2" size={18} />
                  Сгенерировать команду
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-4 bg-green-900/30 rounded-lg border border-green-800/50 p-4">
              <h3 className="text-lg font-medium flex items-center">
                <Icon name="InfoIcon" className="mr-2 text-green-400" size={18} />
                Советы по зельям
              </h3>
              <ul className="mt-2 text-sm text-gray-300 space-y-1">
                <li>• Взрывные зелья наносят эффект по площади</li>
                <li>• Туманные зелья создают облако эффекта</li>
                <li>• Длительность эффекта в тиках (20 тиков = 1 секунда)</li>
                <li>• Уровень эффекта начинается с 0 (0 = I, 1 = II, и т.д.)</li>
                <li>• Не все эффекты совместимы в обычной игре</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
