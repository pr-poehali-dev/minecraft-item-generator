
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ItemGenerator } from '@/components/ItemGenerator';
import { PotionGenerator } from '@/components/PotionGenerator';
import Icon from '@/components/ui/icon';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-gray-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Minecraft Генератор</h1>
          <p className="text-xl text-gray-300">Создавайте уникальные предметы и зелья для вашей игры</p>
        </div>

        <Tabs defaultValue="items" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="items" className="text-lg py-3">
              <Icon name="Sword" className="mr-2" size={20} />
              Генератор предметов
            </TabsTrigger>
            <TabsTrigger value="potions" className="text-lg py-3">
              <Icon name="Flask" className="mr-2" size={20} />
              Генератор зелий и стрел
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="items" className="space-y-4">
            <ItemGenerator />
          </TabsContent>
          
          <TabsContent value="potions" className="space-y-4">
            <PotionGenerator />
          </TabsContent>
        </Tabs>
      </div>
      
      <footer className="mt-12 text-center text-gray-400 text-sm">
        <p>Minecraft генератор команд © 2025</p>
      </footer>
    </div>
  );
};

export default Index;
