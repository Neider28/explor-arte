"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AsyncSelect from "react-select/async";
import { ArtistI } from "@/interfaces/artist";
import Loading from "@/components/loading";
import { ArtI } from "@/interfaces/art";
import { ArtItem } from "@/components/art-item";

const formSearchSchema = z.object({
  input: z.string().optional(),
  author: z.string().optional(),
});

const filterOptions = async (inputValue: string) => {
  const res = await fetch(`/api/artists?q=${inputValue.toLocaleLowerCase()}`);
  const data = await res.json();

  return data.map((item: ArtistI) => ({
    value: item.id,
    label: item.name,
  }));
};

const promiseOptions = (inputValue: string) =>
  new Promise<ArtistI[]>((resolve) => {
    resolve(filterOptions(inputValue));
  });

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [arts, setArts] = useState<ArtI[]>([]);

  const formSearch = useForm<z.infer<typeof formSearchSchema>>({
    resolver: zodResolver(formSearchSchema),
    defaultValues: {
      input: "",
      author: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSearchSchema>) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `/api/search?involvedMaker=${values.author}&q=${values.input}`,
      );

      const data = await res.json();

      setArts(data.artObjects);
      setIsLoading(false);
    } catch (error) {
      setArts([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onSubmit({ input: "", author: "" });
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Search for a work of art</CardTitle>
          <CardDescription className="text-center text-base font-medium">Find the most famous works of art at the Rijksmuseum museum</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...formSearch}>
            <form onSubmit={formSearch.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={formSearch.control}
                name="input"
                render={({ field }) => (
                  <FormItem className="space-y-2 sm:space-x-2">
                    <FormControl>
                      <Input autoComplete="off" disabled={isLoading} placeholder="Bureau..." type="search" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSearch.control}
                name="author"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <AsyncSelect
                        instanceId="autocomplete-authors"
                        cacheOptions
                        defaultOptions
                        className="text-sm"
                        placeholder="Abraham Roentgen..."
                        loadOptions={promiseOptions}
                        isDisabled={isLoading}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption ? selectedOption.label : "");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && (
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                )}
                Search
            </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <main className="w-full flex-1 bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-6">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4">
            {arts.map(
              (item) => item.showImage && <ArtItem key={item.id} item={item} />,
            )}
          </div>
        )}
      </main>
    </div>
  );
}
