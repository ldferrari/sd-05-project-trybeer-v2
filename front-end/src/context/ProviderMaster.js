import React from 'react';
import GeneralProvider from './general/GeneralProvider';
import GeneralProvider1 from './general/GeneralProvider1';
import GeneralProvider2 from './general/GeneralProvider2';

export default function ProviderMaster() {
  return (
    <div>
      <GeneralProvider />
      <GeneralProvider1 />
      <GeneralProvider2 />
    </div>
  );
}
