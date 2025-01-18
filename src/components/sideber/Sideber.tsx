import "./Sideber.css";

interface SubMenuProps {
  renderSubMenu: () => JSX.Element | null;
}

const Sideber = ({ renderSubMenu }: SubMenuProps) => {
  return <div className="subManu">{renderSubMenu()}</div>;
};

export default Sideber;
