import TablePagination from '@mui/material/TablePagination';

type PageProps = {
  total: number;
  limit: number;
  page: number;
};
type HandlePageChanges = {
  handlePageChange: (event: unknown, newPage: number) => void;
  handleLimitChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Bottom(props: PageProps & HandlePageChanges) {
  return (
    <TablePagination
      component="div"
      count={props.total}
      page={props.page}
      rowsPerPage={props.limit}
      onPageChange={props.handlePageChange}
      onRowsPerPageChange={props.handleLimitChange}
      rowsPerPageOptions={[4, 8, 12, { label: 'All', value: -1 }]}
    />
  );
}
