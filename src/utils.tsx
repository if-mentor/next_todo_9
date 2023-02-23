/**
 * unix時間を画面表示する文字列へ変換
 * 
 * 戻り値 例： 2020-11-8 18:55
 * 
 * @param unixTimeSeconds 
 * @returns 
 */
export const formatDateStr = (unixTimeSeconds: number) => {
  const date = new Date(unixTimeSeconds * 1000);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${hour}:${minute}`;
};