import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
	eslint: {
		// Temporary: allow CI/deployment builds while lint debt is being cleaned up.
		ignoreDuringBuilds: true,
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

