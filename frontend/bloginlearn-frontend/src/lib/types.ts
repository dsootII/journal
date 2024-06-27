interface Entry {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  user: number;
  container: number;
}

interface Container {
  name: string;
  entries: Entry[];
}

type Containers = Container[];