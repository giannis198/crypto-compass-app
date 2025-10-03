// providers/BackgroundProvider.tsx
import { View } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

export function BackgroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { backgroundColor } = useAppTheme();

  return <View style={{ flex: 1, backgroundColor }}>{children}</View>;
}
