import AsyncStorage from '@react-native-async-storage/async-storage';

export type StoriesandlghstravlAchvCategoryId =
  | 'greece'
  | 'scandinavia'
  | 'china';

const storiesandlghstravlKeyAchvReads = 'storiesandlghstravl_achv_reads_v1';

export type StoriesandlghstravlAchvReadsMap = Partial<
  Record<StoriesandlghstravlAchvCategoryId, number>
>;

export async function storiesandlghstravlGetAchvReads(): Promise<StoriesandlghstravlAchvReadsMap> {
  try {
    const raw = await AsyncStorage.getItem(storiesandlghstravlKeyAchvReads);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {};
    }
    const out: StoriesandlghstravlAchvReadsMap = {};
    for (const k of ['greece', 'scandinavia', 'china'] as const) {
      const v = (parsed as Record<string, unknown>)[k];
      if (typeof v === 'number' && Number.isFinite(v) && v >= 0) {
        out[k] = Math.floor(v);
      }
    }
    return out;
  } catch {
    return {};
  }
}

export async function storiesandlghstravlIncAchvRead(
  categoryId: StoriesandlghstravlAchvCategoryId,
  by = 1,
): Promise<void> {
  try {
    const current = await storiesandlghstravlGetAchvReads();
    const prev = current[categoryId] ?? 0;
    const next = {...current, [categoryId]: Math.max(0, prev + by)};
    await AsyncStorage.setItem(
      storiesandlghstravlKeyAchvReads,
      JSON.stringify(next),
    );
  } catch {
    console.error('err');
  }
}
