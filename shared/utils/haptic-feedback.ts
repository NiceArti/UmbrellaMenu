import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const hapticsImpactMedium = async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
};