import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import Toggle from '../Toggle/Toggle';
import { ReactComponent as WatermarkIcon } from './watermark.svg';
import classNames from 'classnames';
import './Watermarking.css';

function Watermarking({ file, policy, policyChange }) {
  const SUPPORTED_MEDIA = [
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/png',
    'application/pdf',
  ];
  const mediaType = file.file && file.file.type;
  const disabled = !SUPPORTED_MEDIA.includes(mediaType);
  console.log(`${disabled} file.type = ${mediaType}, file = ${JSON.stringify(file)}`);
  const onChange = disabled
    ? undefined
    : policyChange((builder, e) =>
        e.target.checked ? builder.enableWatermarking() : builder.disableWatermarking(),
      );
  const checked = disabled ? undefined : policy && policy.hasWatermarking();
  return (
    <div className={classNames('Watermarking', { 'Watermarking-disabled': disabled })}>
      <SectionHeader>
        <WatermarkIcon />
        <h4>Watermarking</h4>
        <Toggle id="watermark" disabled={disabled} checked={checked} onChange={onChange} />
      </SectionHeader>
    </div>
  );
}

export default Watermarking;
