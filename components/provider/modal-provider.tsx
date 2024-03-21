"use client";

import useClient from "@/hooks/use-client";
import ContactModal from "../modal/contact-modal";

export const ModalProvider = () => {
  const { isClient } = useClient();
  return (
    <>
      {isClient && (
        <>
          <ContactModal />
        </>
      )}
    </>
  );
};
