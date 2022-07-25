import { ProposalStatusProps } from 'components/ProposalStatus/types';
import { Proposal, ENSAvatar } from '../Types';
import { DecodedAction } from 'components/ActionsBuilder/types';

export interface ProposalCardProps {
  proposal?: Proposal;
  votes?: number[];
  ensAvatar?: ENSAvatar;
  href?: string;
  statusProps?: ProposalStatusProps;
  summaryActions?: DecodedAction[];
}
