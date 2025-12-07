import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../types';

export interface ClientInput {
  name: string;
  productIds: number[];
}

export interface SimulationResult {
  client: string;
  products: { name: string; price: number }[];
  totalCost: number;
  processingTime: string;
}

export const SimulationService = {
  run: async (clients: ClientInput[]) => {
    if (!clients.length) return { totalTime: '0.00s', details: [] };

    const allProductIds = clients.flatMap((c) => c.productIds);
    const productList = await ProductRepository.findByIds(allProductIds);
    
    const productMap = new Map<number, Product>(productList.map((p) => [p.id, p]));

    const results: SimulationResult[] = [];
    let totalSimulationTime = 0;

    console.log('Starting simulation...');

    for (const client of clients) {
      const clientStartTime = Date.now();
      let clientTotalCost = 0;
      const processedProducts: { name: string; price: number }[] = [];

      console.log(`Processing client: ${client.name}`);

      for (const productId of client.productIds) {
        const product = productMap.get(productId);
        if (!product) continue;

        await new Promise((resolve) => setTimeout(resolve, 500));

        clientTotalCost += product.price;
        processedProducts.push({
          name: product.name,
          price: product.price,
        });
      }

      const clientEndTime = Date.now();
      const clientDuration = (clientEndTime - clientStartTime) / 1000;
      totalSimulationTime += clientDuration;

      results.push({
        client: client.name,
        products: processedProducts,
        totalCost: clientTotalCost,
        processingTime: `${clientDuration.toFixed(2)}s`,
      });

      console.log(`Finished client: ${client.name} in ${clientDuration}s`);
    }

    return {
      message: 'Simulation completed',
      totalTime: `${totalSimulationTime.toFixed(2)}s`,
      details: results,
    };
  },
};
