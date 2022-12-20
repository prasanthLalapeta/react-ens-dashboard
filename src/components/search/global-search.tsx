import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { SearchInput } from '../core';
import {
  SearchModalTrigger,
  ModalOverlay,
  ModalContent,
  SearchContainer,
  SearchResultsWrapper,
  CloseIcon,
  MobileSearchBar,
} from './styles';
import DomainSearchResults from './domain-search-results';

/* --------------------------------------------------------------------------
 * Global Search Component
 * --------------------------------------------------------------------------*/

type GlobalSearchTypes = {
  startAnimation?: boolean;
  isMobileScreen?: boolean;
  revertMobileNavAnimation?: () => void;
};

export const GlobalSearch = ({
  startAnimation,
  isMobileScreen,
  revertMobileNavAnimation,
}: GlobalSearchTypes) => {
  const { t } = useTranslation();
  const placeholderText = t(
    'translation:inputField.placeholder.searchENS',
  );

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [searchText, setSearchText] = useState('');

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setSearchText('');
  };

  const closeDropDown = () => {
    handleModalOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    revertMobileNavAnimation && revertMobileNavAnimation();
  };

  if (isMobileScreen) {
    return (
      <MobileSearchBar>
        <SearchModalTrigger startAnimation={startAnimation}>
          <SearchInput
            placeholder={placeholderText}
            setValue={(value) => {
              setSearchText(value);
            }}
            isMobileScreen={isMobileScreen}
          />
          {Boolean(searchText.length) && (
            <CloseIcon
              icon="close"
              size="lg"
              isMobileScreen={isMobileScreen}
              onClick={() => setSearchText('')}
            />
          )}
        </SearchModalTrigger>
        {searchText && (
          <SearchResultsWrapper>
            <DomainSearchResults
              searchText={searchText}
              closeDropDown={closeDropDown}
            />
          </SearchResultsWrapper>
        )}
      </MobileSearchBar>
    );
  }
  return (
    <DialogPrimitive.Root
      open={modalOpened}
      onOpenChange={handleModalOpen}
    >
      {/*
        ---------------------------------
        Modal Trigger
        ---------------------------------
      */}
      <DialogPrimitive.Trigger asChild>
        <SearchModalTrigger startAnimation={startAnimation}>
          <SearchInput placeholder={placeholderText} />
        </SearchModalTrigger>
      </DialogPrimitive.Trigger>
      {/*
        ---------------------------------
        Modal Overlay
        ---------------------------------
      */}
      <ModalOverlay />
      {/*
        ---------------------------------
        Modal Content
        ---------------------------------
      */}
      <ModalContent>
        <SearchContainer>
          <SearchInput
            placeholder={placeholderText}
            setValue={(value) => setSearchText(value)}
            isMobileScreen={isMobileScreen}
          />
        </SearchContainer>
        <DomainSearchResults
          searchText={searchText}
          closeDropDown={closeDropDown}
        />
      </ModalContent>
    </DialogPrimitive.Root>
  );
};
