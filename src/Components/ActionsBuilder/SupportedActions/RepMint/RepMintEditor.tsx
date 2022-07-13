import styled from 'styled-components';
import Input from 'old-components/Guilds/common/Form/Input';
import Avatar from 'old-components/Guilds/Avatar';
import React, { useEffect } from 'react';
import { ActionEditorProps } from '..';
import { ethers } from 'ethers';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { Box } from 'Components/Primitives/Layout';
import { shortenAddress, MAINNET_ID } from 'utils';
import { ReactComponent as Info } from 'assets/images/info.svg';
import StyledIcon from 'old-components/Guilds/common/SVG';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { useState } from 'react';
import NumericalInput from 'old-components/Guilds/common/Form/NumericalInput';
import { useTotalSupply } from 'hooks/Guilds/guild/useTotalSupply';
import { useTokenData } from 'hooks/Guilds/guild/useTokenData';
import { StyledToolTip } from 'old-components/Guilds/common/ToolTip';
import { useTranslation } from 'react-i18next';

const Control = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 0.75rem 0;
  width: 100%;
`;

const ControlLabel = styled(Box)`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.proposalText.grey};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

const ControlRow = styled(Box)`
  display: flex;
  align-items: stretch;
  height: 100%;
`;

const RepMintInput = styled(NumericalInput)`
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledInfoIcon = styled(StyledIcon)`
  &:hover + ${StyledToolTip} {
    visibility: visible;
  }
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Mint: React.FC<ActionEditorProps> = ({
  decodedCall,
  updateCall,
}) => {
  const { t } = useTranslation();

  // parse transfer state from calls
  const [repPercent, setRepPercent] = useState<string>('0');
  const [repAmount, setRepAmount] = useState<string>('0');
  const { parsedData } = useTotalSupply({ decodedCall });
  const { tokenData } = useTokenData();

  const totalSupply = useBigNumberToNumber(tokenData?.totalSupply, 18);

  const { imageUrl } = useENSAvatar(parsedData?.toAddress, MAINNET_ID);
  const setCallDataAmount = (value: string) => {
    const amount = value ? ethers.utils.parseUnits(value) : null;
    updateCall({
      ...decodedCall,
      args: {
        ...decodedCall.args,
        amount,
      },
    });
  };

  useEffect(() => {
    setRepAmount(String((Number(repPercent) / 100) * totalSupply));
    if (repAmount) {
      setCallDataAmount(repAmount.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repPercent, repAmount, totalSupply]);

  const handleRepChange = (e: string) => {
    if (e) {
      setRepPercent(e);
    }
  };
  return (
    <React.Fragment>
      <Control>
        <ControlLabel>
          {t('repMint.recipient')}
          <StyledInfoIcon src={Info} />
          <StyledToolTip>{t('repMint.recipientTooltip')}</StyledToolTip>
        </ControlLabel>
        <ControlRow>
          <Input
            value={shortenAddress(parsedData?.toAddress)}
            icon={
              <Avatar
                src={imageUrl}
                defaultSeed={parsedData?.toAddress}
                size={18}
              />
            }
            readOnly
          />
        </ControlRow>
      </Control>
      <ControlRow>
        <Control>
          <ControlLabel>
            {t('repMint.repPercent')}
            <StyledInfoIcon src={Info} />
            <StyledToolTip>{t('repMint.repPercentTooltip')}</StyledToolTip>
          </ControlLabel>
          <ControlRow>
            <RepMintInput value={repPercent} onChange={handleRepChange} />
          </ControlRow>
        </Control>
      </ControlRow>
      <ControlRow>
        <Control>
          <ControlLabel>
            {t('repMint.repAmount')}
            <StyledInfoIcon src={Info} />
            <StyledToolTip>{t('repMint.repAmountTooltip')}</StyledToolTip>
          </ControlLabel>
          <ControlRow>
            <RepMintInput
              value={repAmount}
              onChange={handleRepChange}
              readOnly
            />
          </ControlRow>
        </Control>
      </ControlRow>
    </React.Fragment>
  );
};

export default Mint;