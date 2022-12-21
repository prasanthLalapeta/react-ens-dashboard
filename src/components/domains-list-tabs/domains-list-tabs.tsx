import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import copyToClipboard from 'copy-to-clipboard';
import { DomainsInGridView } from '../all-domains';
import {
  Container,
  TabsRoot,
  TabsTrigger,
  TabsList,
  TabsContentWrapper,
  TabsContent,
  CollectionOptionsList,
  ButtonsWrapper,
  ComingSoonText,
} from './styles';
import { Icon } from '../icons';
import { useAppDispatch, notificationActions } from '../../store';
import { LinkButton } from '../core';
import config from '../../config/env';
import { ConfettiParticles } from '../particles';

/* --------------------------------------------------------------------------
 * Domains List Tabs Component
 * --------------------------------------------------------------------------*/

export const DomainsListTabs = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const selectedTab = useMemo(() => {
    const pathName = location.pathname.split('/').pop();

    if (pathName === 'table-view') return pathName;

    return 'grid-view';
  }, [location]);

  const [itemsStatus, activityStatus] = useMemo<
    ('active' | 'inactive')[]
  >(
    () =>
      ['grid-view', 'table-view'].map((tab) =>
        selectedTab === tab ? 'active' : 'inactive',
      ),
    [selectedTab],
  );

  return (
    <Container>
      <TabsRoot defaultValue="grid-view" value={selectedTab}>
        <CollectionOptionsList>
          <TabsList aria-label="Manage your account">
            <TabsTrigger
              value="grid-view"
              status={itemsStatus}
              onClick={() => navigate(`/${config.collectionId}`)}
            >
              <Icon icon="grid" paddingRight />
              {t('translation:tabs.items')}
            </TabsTrigger>
            <TabsTrigger
              value="table-view"
              status={activityStatus}
              onClick={() =>
                navigate(`/${config.collectionId}/table-view`)
              }
            >
              <Icon icon="activity" paddingRight />
              {t('translation:tabs.activity')}
            </TabsTrigger>
          </TabsList>
          <ButtonsWrapper>
            <LinkButton
              type="textBtn"
              url="https://github.com/prasanthLalapeta/react-ens-dashboard"
            >
              {t('translation:buttons.links.website')}
            </LinkButton>
            <LinkButton url="https://discord.com/users/1636">
              <Icon icon="discord" />
            </LinkButton>
            <LinkButton
              handleClick={() => {
                copyToClipboard(window.location.href);
                dispatch(
                  notificationActions.setSuccessMessage(
                    `${t(
                      'translation:successMessages.copyToClipboard',
                    )}`,
                  ),
                );
              }}
            >
              <Icon icon="share" />
            </LinkButton>
          </ButtonsWrapper>
        </CollectionOptionsList>
        <TabsContent value="grid-view">
          <TabsContentWrapper>
            <DomainsInGridView />
          </TabsContentWrapper>
        </TabsContent>
        <TabsContent value="table-view">
          <ConfettiParticles />
          <ComingSoonText>Coming Soon</ComingSoonText>
        </TabsContent>
      </TabsRoot>
    </Container>
  );
};
