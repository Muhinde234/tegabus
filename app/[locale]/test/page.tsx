import React from 'react'
import { useTranslations } from "next-intl";


const page = () => {
const t = useTranslations("systemSettings");

  return (
    <div>
        <span>
            {t("actions.edit")}
        </span>
    </div>
  )
}

export default page