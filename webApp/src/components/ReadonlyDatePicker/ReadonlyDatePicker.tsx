import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {DatePickerProps} from "@mui/x-date-pickers";
import {type ReactElement} from "react";

export const ReadonlyDatePicker = (props: DatePickerProps): ReactElement => {
    return <DatePicker {...props}
                       slotProps={{
                           textField: {
                               fullWidth: true,
                               variant: "filled",
                               sx: {
                                   width: "100%",
                                   "&, & *": {
                                       color: "inherit !important",
                                       opacity: "1 !important",
                                       backgroundColor: "transparent !important",
                                       cursor: "not-allowed",
                                   },

                                   "& input, & .MuiInputBase-input, & .MuiOutlinedInput-input, & .MuiFilledInput-input": {
                                       color: "inherit !important",
                                       opacity: "1 !important",
                                       "-webkit-text-fill-color": "currentColor !important",
                                   },

                                   "& .MuiInputBase-root.Mui-disabled, & .MuiOutlinedInput-root.Mui-disabled, & .MuiFilledInput-root.Mui-disabled": {
                                       color: "inherit !important",
                                       opacity: "1 !important",
                                       backgroundColor: "transparent !important",
                                   },

                                   "& input.Mui-disabled, & .MuiInputBase-root.Mui-disabled .MuiInputBase-input, & .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-input": {
                                       color: "inherit !important",
                                       opacity: "1 !important",
                                       "-webkit-text-fill-color": "currentColor !important",
                                   },

                                   "& .MuiInputLabel-root.Mui-disabled": {
                                       color: "inherit !important",
                                       opacity: "1 !important",
                                   },

                                   "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                                       borderColor: "rgba(0, 0, 0, 0.23) !important",
                                   },
                                   "& .MuiFilledInput-root.Mui-disabled:before, & .MuiFilledInput-root.Mui-disabled:after": {
                                       borderBottomColor: "rgba(0, 0, 0, 0.23) !important",
                                   },

                                   "& .MuiInputAdornment-root .MuiSvgIcon-root, & .MuiIconButton-root": {
                                       color: "inherit !important",
                                       opacity: "1 !important",
                                   },

                                   "& input": {
                                       caretColor: "transparent",
                                       userSelect: "text",
                                   },
                               },
                           },
                       }}
                       disabled
    />
};
