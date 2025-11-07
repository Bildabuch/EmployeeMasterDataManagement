import {Divider, Stack, Typography} from "@mui/material";
import {type ReactElement} from "react";

/**
 * Props for the LinedHeading component.
 *
 * @interface LinedHeadingProps
 * @property {string} heading - The text to display as the heading.
 */
export interface LinedHeadingProps {
    heading: string
}

/**
 * This component renders a heading followed by a horizontal divider. It is typically used
 * to visually separate sections with a short label on the left and a line extending to the right.
 *
 * @param {LinedHeadingProps} props - The properties for the component.
 * @returns {ReactElement} The rendered LinedHeading component.
 */
export const LinedHeading = (props: LinedHeadingProps): ReactElement => {
    const {heading} = props;
    return <Stack direction="row"
                  spacing={1}
                  alignItems="center">
        <Typography variant="caption">
            {heading}
        </Typography>
        <Divider role="presentation"
                 sx={{flex: 1}}/>
    </Stack>
};
