import {
	AppShell,
	
	Button,
	Center,
	Image,
	SimpleGrid,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";


const Home = () => {
	const matches = useMediaQuery("(min-width: 500px)");

	return (
		<AppShell
			padding="md"			
		>
			{
				<Center
					style={{
						position: "relative",
						top: 20,
						left: 0,
						right: 0,
						bottom: 0,
					}}
				>
					<SimpleGrid cols={matches ? 3 : 1} style={{ alignItems: "bottom" }}>
						<Button size="lg" component={Link} to="/appointment" >
							View List of Appointments
						</Button>
						<Button size="lg" component={Link} to="/form">
							Schedule Appointment
						</Button>
					</SimpleGrid>
				</Center>
			},
            {
            <Image width={800} src={require("../../images/vaccination-campaign.png")} alt="vaccination-campaign.png" 
            style={{
                position: "relative",
                top: 70,
                left: 150,
                right: 0,
                bottom: 0,
            }}
            />

            }
		</AppShell>
	);
};

export default Home;