import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { Capacitor } from "@capacitor/core";

export const hapticsImpactMedium = async () => {
  try {
    const canVibrate = navigator.vibrate;
    const isNative = Capacitor.isNativePlatform();

    if (!canVibrate && !isNative) return;

    await Haptics.impact({ style: ImpactStyle.Heavy });
  } catch {}
};
