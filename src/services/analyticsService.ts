const ANALYTICS_STORAGE_KEY = 'wisher_analytics';

export interface WishAnalytics {
  views: number;
  lastViewedAt: string;
}

export const analyticsService = {
  trackView(id: string): void {
    try {
      const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
      const analytics: Record<string, WishAnalytics> = raw ? JSON.parse(raw) : {};

      if (!analytics[id]) {
        analytics[id] = { views: 0, lastViewedAt: new Date().toISOString() };
      }

      analytics[id].views += 1;
      analytics[id].lastViewedAt = new Date().toISOString();

      localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(analytics));
    } catch (error) {
      console.error('[AnalyticsService] Failed to track view:', error);
    }
  },

  getAnalytics(): Record<string, WishAnalytics> {
    try {
      const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      console.error('[AnalyticsService] Failed to get analytics:', error);
      return {};
    }
  }
};
