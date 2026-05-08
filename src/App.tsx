import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function App() {
  const [inputPacks, setInputPacks] = useState<number>(0);
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const PRICE_PER_PACK = 7.0; // Pre-established price

  const effectivePacks = inputPacks > 0 
    ? inputPacks 
    : Math.floor(amountPaid / PRICE_PER_PACK);

  const totalValue = effectivePacks * PRICE_PER_PACK;
  const balance = amountPaid - totalValue;

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-12 flex items-center justify-center">
      <Card className="w-full max-w-md md:max-w-2xl lg:max-w-3xl shadow-2xl border-none">
        <CardHeader className="space-y-2 md:space-y-4 text-center">
          <CardTitle className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900">
            Calculadora de Figurinhas
          </CardTitle>
          <CardDescription className="text-sm md:text-lg lg:text-xl text-neutral-500 font-medium">
            Calcule o valor total e o troco dos seus pacotes.
            <br />
            Preço por pacote: <span className="text-neutral-900 font-bold">R$ {PRICE_PER_PACK.toFixed(2)}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 md:space-y-8 p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="packs" className="text-sm md:text-base lg:text-lg font-semibold text-neutral-700">
                Quantidade de Pacotes (opcional)
              </Label>
              <Input
                id="packs"
                type="number"
                placeholder="Ex: 10"
                className="h-12 md:h-16 text-lg md:text-2xl border-neutral-200 focus:ring-black"
                value={inputPacks || ''}
                onChange={(e) => setInputPacks(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="paid" className="text-sm md:text-base lg:text-lg font-semibold text-neutral-700">
                Valor Pago (R$)
              </Label>
              <Input
                id="paid"
                type="number"
                placeholder="Ex: 50.00"
                className="h-12 md:h-16 text-lg md:text-2xl border-neutral-200 focus:ring-black"
                value={amountPaid || ''}
                onChange={(e) => setAmountPaid(Number(e.target.value))}
              />
            </div>
          </div>
          
          <div className="p-6 md:p-8 bg-neutral-100 rounded-2xl text-center space-y-2 md:space-y-4 border border-neutral-200">
            <div className="text-sm md:text-lg uppercase tracking-widest text-neutral-500 font-bold">
              Resumo da Compra
            </div>
            <div className="text-xl md:text-3xl lg:text-4xl font-medium text-neutral-800">
              <span className="font-bold text-black">{effectivePacks}</span> pacotes sugeridos
            </div>
            <div className="text-2xl md:text-4xl lg:text-5xl font-black text-black">
              Total: R$ {totalValue.toFixed(2)}
            </div>
          </div>

          <div className={`p-6 md:p-10 rounded-2xl text-center font-black transition-all duration-300 shadow-sm ${
            balance >= 0 
              ? 'bg-green-50 text-green-700 border-2 border-green-200' 
              : 'bg-red-50 text-red-700 border-2 border-red-200'
          }`}>
            <div className="text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter">
              {balance >= 0 ? (
                <>Troco: R$ {balance.toFixed(2)}</>
              ) : (
                <>Faltam: R$ {Math.abs(balance).toFixed(2)}</>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
