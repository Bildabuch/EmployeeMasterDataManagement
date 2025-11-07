import {TextField, TextFieldProps} from "@mui/material";
import {type ReactElement} from "react";

/**
 * ReadonlyTextField
 *
 * A wrapper around Material-UI's TextField component that renders a read-only text field.
 * This component ensures that the text field is styled appropriately for a disabled state,
 * while maintaining inherited styles and allowing custom styles via the `sx` prop.
 *
 * @param {TextFieldProps} props - The props to pass to the TextField component.
 * - `sx` (optional): Custom styles to apply to the component. These styles will be merged with the default styles.
 *
 * @returns {ReactElement} A styled, read-only Material-UI TextField component.
 */
export const ReadonlyTextField = (props: TextFieldProps): ReactElement => {
    return <TextField {...props}
                      disabled
                      sx={{
                          '& .MuiInputBase-root.Mui-disabled': {
                              WebkitTextFillColor: 'unset',
                              color: 'inherit',
                              opacity: 1,
                              backgroundColor: 'transparent',
                          },
                          '& .MuiInputBase-input.Mui-disabled, & .MuiFilledInput-input.Mui-disabled': {
                              WebkitTextFillColor: 'unset',
                              color: 'inherit',
                              opacity: 1,
                              cursor: 'not-allowed'
                          },
                          '& .MuiInputLabel-root.Mui-disabled': {
                              color: 'inherit',
                              opacity: 1
                          },
                          '& .MuiFilledInput-root.Mui-disabled:before, & .MuiFilledInput-root.Mui-disabled:after': {
                              borderBottomColor: 'rgba(0, 0, 0, 0.23)'
                          },
                          ...props.sx
                      }}/>
};
