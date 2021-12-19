import type { FunctionComponent, FormEventHandler, ReactElement } from 'react';

import './SimpleForm.css';

interface SimpleFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>,
  children: ReactElement | ReactElement[]
}

const SimpleForm: FunctionComponent<SimpleFormProps> = props => {
  const { onSubmit, children } = props;

  return (
    <form className="simple-form" onSubmit={onSubmit} noValidate>
      {children}
    </form>
  );
}

export default SimpleForm;
