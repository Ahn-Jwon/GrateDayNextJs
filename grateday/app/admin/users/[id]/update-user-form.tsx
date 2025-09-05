"use client";

import { useToast } from "@/hooks/use-toast";
import { updateUserSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, useForm } from "react-hook-form";
import z from "zod";

const UpdateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: user
    })

    const onSubmit = () => {
        return;
    }

  return <Form {...form}>
    <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Email */}

        {/* Name */}

        {/* Role */}
    </form>
  </Form>;
};

export default UpdateUserForm;
