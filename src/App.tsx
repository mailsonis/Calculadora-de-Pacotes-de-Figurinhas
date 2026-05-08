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
    <div className="min-h-screen bg-neutral-50 p-6 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Calculadora de Figurinhas</CardTitle>
          <CardDescription>
            Calcule o valor total e o troco dos seus pacotes.
            <br />
            Preço por pacote: R$ {PRICE_PER_PACK.toFixed(2)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="packs">Quantidade de Pacotes (opcional)</Label>
            <Input
              id="packs"
              type="number"
              placeholder="Digite a quantidade..."
              value={inputPacks || ''}
              onChange={(e) => setInputPacks(Number(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="paid">Valor Pago (R$)</Label>
            <Input
              id="paid"
              type="number"
              placeholder="Digite o valor pago..."
              onChange={(e) => setAmountPaid(Number(e.target.value))}
            />
          </div>

          <div className="p-3 bg-neutral-100 rounded-lg text-center font-semibold text-lg space-y-1">
            <div>
              Quantidade sugerida: {effectivePacks}
            </div>
            <div>
              Total a Pagar: R$ {totalValue.toFixed(2)}
            </div>
          </div>

          <div className={`p-4 rounded-lg text-center font-bold text-xl ${
            balance >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {balance >= 0 ? (
              <>Troco: R$ {balance.toFixed(2)}</>
            ) : (
              <>Faltam: R$ {Math.abs(balance).toFixed(2)}</>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
