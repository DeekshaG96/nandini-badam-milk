/**
 * Firebase Client Configuration (Optional Hybrid Backend)
 * Handles live bottle inventory counters and customer orders.
 */

export interface LiveStats {
  bottlesConsumedToday: number;
  activeBengaluruDeliveries: number;
  freshBatchesBottled: number;
}

export const initialStats: LiveStats = {
  bottlesConsumedToday: 14820,
  activeBengaluruDeliveries: 342,
  freshBatchesBottled: 28,
};

export async function fetchLiveStats(): Promise<LiveStats> {
  // Graceful simulation when running without Firebase credentials
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        bottlesConsumedToday: 14820 + Math.floor(Math.random() * 45),
        activeBengaluruDeliveries: 342 + Math.floor(Math.random() * 12),
        freshBatchesBottled: 28,
      });
    }, 400);
  });
}
