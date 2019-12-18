import React from 'react'
import snarkdown from 'snarkdown'

import { MainTitle } from 'cozy-ui/react/Text'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell
} from 'cozy-ui/react/Table'
import Empty from 'cozy-ui/react/Empty'
import Stack from 'cozy-ui/react/Stack'

import { translate } from 'cozy-ui/react/I18n'
import { withBreakpoints } from 'cozy-ui/transpiled/react'
import { withClient } from 'cozy-client'
import Add from 'components/notes/add'
import icon from 'assets/icons/icon_note_empty.svg'
import 'components/notes/list.styl'
import useReferencedFolderForNote from 'components/notes/hooks/useReferencedFolderForNote'

const EmptyComponent = translate()(
  withClient(({ t, client }) => {
    const { notesFolder } = useReferencedFolderForNote(client)
    return (
      <div className="empty">
        <Empty
          id="empty"
          icon={icon}
          title={t('Notes.Empty.welcome')}
          text={
            <p
              className="u-mb-half"
              dangerouslySetInnerHTML={{
                __html: snarkdown(
                  t('Notes.Empty.after_created', {
                    notesFolder
                  })
                )
              }}
            />
          }
        >
          <Add className="u-mt-1" />
        </Empty>
      </div>
    )
  })
)

const List = translate()(({ t }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableHeader className="tableCellName">
          {t('Notes.List.name')}
        </TableHeader>
        <TableHeader className="tableCell">
          {t('Notes.List.updated_at')}
        </TableHeader>
        <TableHeader className="tableCell">
          {t('Notes.List.location')}
        </TableHeader>
        <TableHeader className="tableCell">
          {t('Notes.List.sharings')}
        </TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow className="tableRowEmpty">
        <TableCell className="tableCellEmpty">
          <EmptyComponent />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
))

//We don't not display the Title this way in Mobile.
//We use Bar.centrer
const TitleApp = ({ t, breakpoints: { isMobile } }) => {
  return isMobile ? null : (
    <MainTitle className="titlePadding u-mt-1">
      {t('Notes.List.my_notes')}
    </MainTitle>
  )
}

const TitleAppConnected = withBreakpoints()(translate()(TitleApp))

const EmptyPage = () => (
  <Stack>
    <TitleAppConnected />
    <List />
  </Stack>
)
export default EmptyPage
