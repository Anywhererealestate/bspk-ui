import { PageHeader } from './PageHeader';
import { ExamplePlaceholder } from '-/components/ExamplePlaceholder';

const Slot = ExamplePlaceholder;

export const example = () => {
    return (
        <PageHeader
            actions={<Slot height={32} label="Page actions slot" width={372} />}
            subHeader={
                <>
                    <Slot height="var(--spacing-sizing-06)" label="Slot component" width={200} />
                    <Slot height="var(--spacing-sizing-06)" label="Slot component 2" width={200} />
                </>
            }
            title="Page Title"
        />
    );
};
