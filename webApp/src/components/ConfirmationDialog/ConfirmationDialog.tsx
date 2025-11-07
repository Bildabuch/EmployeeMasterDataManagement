import type {ReactElement} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";

/**
 * Props for ConfirmationDialog component.
 *
 * @interface ConfirmationDialogProps
 *
 * @property {(result: boolean) => void} onClose
 *   Callback invoked when the dialog is closed. Called with `true` if the user confirmed the action,
 *   otherwise called with `false` when the user cancels.
 *
 * @property {string[]} employeeNames
 *   Array of employee display names that will be rendered as a list inside the dialog.
 */
export interface ConfirmationDialogProps {
    /**
     * Called when the user closes the dialog.
     * @param result - true when the user confirmed, false when canceled
     */
    onClose: (result: boolean) => void;

    /**
     * List of employee names to display in the dialog.
     */
    employeeNames: string[];
}

/**
 * Renders a modal confirmation dialog for deleting employees.
 *
 * @param {ConfirmationDialogProps} props - Component props.
 * @param {(result: boolean) => void} props.onClose - Handler invoked with the user's decision.
 * @param {string[]} props.employeeNames - Names to present in the confirmation list.
 *
 * @returns {ReactElement} A modal dialog element with confirmation and cancel actions.
 *
 * Implementation details:
 * - Uses Material UI Dialog components for structure and styling.
 * - Maps `employeeNames` to a simple unordered list where each name is displayed using Typography.
 * - The "Nein" button closes with `onClose(false)`. The "Ja" button closes with `onClose(true)` and is styled as a destructive action.
 */
export const ConfirmationDialog = (props: ConfirmationDialogProps): ReactElement => {
    const {onClose, employeeNames} = props;
    return <Dialog open={true}>
        <DialogTitle>
            Mitarbeiter löschen?
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Möchten Sie wirklich folgende Mitarbeiter löschen?
            </DialogContentText>
            <ul>
                {employeeNames.map(name => <li key={name}>
                    <Typography variant="caption">
                        {name}
                    </Typography>
                </li>)}
            </ul>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => onClose(false)}>
                Nein
            </Button>
            <Button onClick={() => onClose(true)}
                    color="error"
                    autoFocus>
                Ja
            </Button>
        </DialogActions>
    </Dialog>
};
