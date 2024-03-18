import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Paper,
  Typography,
  useTheme,
} from "@mui/material"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDebouncedCallback } from "use-debounce"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { getAllDoctors, setAppointmentsQueryParams } from "@/features/doctors"
import { NoDataMsg, Search } from "@/shared"

import DoctorCard from "../components/DoctorCard/DoctorCard"

const DoctorSelection = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const {
    appointmentsQueryParams: { currentPage, pageSize, search },
    data,
    status,
    totalItems,
  } = useAppSelector((state) => state.doctors)
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(getAllDoctors(true))
  }, [currentPage, dispatch, search])

  const handleOnChangeSearch = useDebouncedCallback((search: string) => {
    dispatch(setAppointmentsQueryParams({ search }))
  }, 500)
  const handleRefreshContent = async () => {
    await dispatch(getAllDoctors(true))
  }
  const handleChangePage = (page: number) => {
    dispatch(setAppointmentsQueryParams({ currentPage: page }))
  }
  return (
    <>
      <Typography component="h2" fontWeight="bold" mb={2} variant="h4">
        {t("common:searchDoctor")}
      </Typography>
      <Typography component="h3" mb={2} variant="subtitle1">
        {t("appointment:findDoctor")}
      </Typography>
      <Search
        onChangeSearch={handleOnChangeSearch}
        onRefreshContent={handleRefreshContent}
      />
      <Grid columnSpacing={3} marginY={4} rowSpacing={4} container>
        {data && data.length > 0 && status !== "loading" ? (
          data.map(
            ({
              _id,
              ClinicAffiliation,
              DoctorSpecialization,
              name,
              photo,
              professionalStatement,
              surname,
            }) => {
              return (
                <Grid key={_id} lg={6} sm={12} xs={12} item>
                  <DoctorCard
                    clinicAffiliations={ClinicAffiliation}
                    doctorId={_id}
                    name={`${name} ${surname}`}
                    photo={photo}
                    professionalStatement={professionalStatement}
                    specializations={DoctorSpecialization}
                  />
                </Grid>
              )
            },
          )
        ) : status === "loading" ? (
          <Box display="flex" justifyContent="center" width="100%">
            <CircularProgress />
          </Box>
        ) : (
          <NoDataMsg />
        )}
      </Grid>
      <Paper
        sx={{
          padding: 2,
          borderRadius: theme.spacing(2.5),
          display: "flex",
          justifyContent: "center",
          boxShadow: theme.mainShadow.main,
        }}
      >
        <Pagination
          color="primary"
          count={Math.ceil(totalItems / pageSize)}
          page={currentPage}
          onChange={(_, value) => {
            handleChangePage(value)
          }}
        />
      </Paper>
    </>
  )
}

export default DoctorSelection
