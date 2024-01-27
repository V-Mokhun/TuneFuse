<script lang="ts">
  import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/shared/ui";
  import { Link } from "svelte-routing";
</script>

<section>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-xl">Sign In</CardTitle>
      <CardDescription>Enter your email and password to sign in</CardDescription
      >
    </CardHeader>
    <CardContent>
      <form class="space-y-4">
        <!-- <div class="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" required type="email" />
        </div>
        <div class="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" required type="password" />
        </div> -->
        <Button class="w-full" type="submit">Sign In</Button>
        <Button class="w-full" variant="outline">Sign in with Google</Button>
        <Button class="w-full" variant="outline">Sign in with GitHub</Button>
        <Button class="w-full" variant="outline">Sign in with Spotify</Button>
      </form>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <Link class="underline" to="/sign-up">Sign up</Link>
      </div>
    </CardContent>
  </Card>
</section>

<style>
</style>
