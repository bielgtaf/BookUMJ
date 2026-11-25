export function navigateToRootStack(navigation, routeName, params) {
  const parentNavigation = navigation.getParent();
  if (parentNavigation) {
    parentNavigation.navigate(routeName, params);
  } else {
    navigation.navigate(routeName, params);
  }
}
