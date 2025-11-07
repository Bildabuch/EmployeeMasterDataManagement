import {render, screen} from '@testing-library/react';
import {LinedHeading} from './LinedHeading';

describe('LinedHeading', () => {
    it('zeigt die übergebene Überschrift und den Divider an', () => {
        render(<LinedHeading heading="Beispiel Überschrift" />);
        expect(screen.getByText('Beispiel Überschrift')).toBeInTheDocument();
        expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('ordnet die Überschrift vor dem Divider an', () => {
        render(<LinedHeading heading="Reihenfolge Test" />);
        const headingNode = screen.getByText('Reihenfolge Test');
        const divider = screen.getByRole('presentation');
        const relation = headingNode.compareDocumentPosition(divider);
        expect(Boolean(relation & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
    });
});