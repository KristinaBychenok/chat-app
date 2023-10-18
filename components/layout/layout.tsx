import MainNavigation from "./main-navigation";

function Layout(props: any) {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
