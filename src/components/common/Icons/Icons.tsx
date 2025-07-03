import { ICON_SIZE_MAP } from "../../../constants/icon";

interface iconsType {
  id: string;
  classes?: string;
  width?: string;
  height?: string;
  iconSize?: string;
}

const Icons = ({ id, classes, iconSize = "small" }: iconsType) => {
  /**
   *  Function to get the width of the icon based on the iconSize prop.
   *  It uses the ICON_SIZE_MAP to determine the width.
   * @returns The width of the icon based on the iconSize prop.
   */
  const iconWidth = (): string => {
    return ICON_SIZE_MAP[iconSize].width;
  };

  /**
   * Function to get the height of the icon based on the iconSize prop.
   * It uses the ICON_SIZE_MAP to determine the height.
   * @returns The height of the icon based on the iconSize prop.
   */
  const iconHeight = (): string => {
    return ICON_SIZE_MAP[iconSize].height;
  };

  return (
    <svg
      data-testid={`lsm-icon-${id}`}
      width={iconWidth()}
      height={iconHeight()}
      className={classes}
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <use href={`/src/assets/icons.svg#${id}`}></use>
    </svg>
  );
};

export default Icons;
