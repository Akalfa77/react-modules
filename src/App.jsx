import { Routes, Route, Link, Navigate } from 'react-router';
import CounterModule from "./modules/Module-4/CounterModule";
import ProductModule from "./modules/Module-1/ProductModule";
import TimerModule from "./modules/Module-2/TimerModule";
import ModuleApp from "./modules/Module-1/ModulePractice/ModuleApp";
import TaskManager from "./modules/Module-3/ModulePractice2/TaskManager";
import CounterApp from "./modules/Module-3/CounterApp";
import Practice from "./modules/Module-2/ModulePractice3/Practice";
import ModulePractice5 from "./modules/Module-5/ModulePractice5/ModulePractice5";
import ModalApp from "./modules/Module-5/MileStone5/ModalApp";
import ModuleApp6 from "./modules/Module-6/Module demo/ModuleApp6";
import Layout1 from "./modules/Module-6/Prop Drilling/Layout1";
import FinalApp6 from "./modules/Module-6/FinalApp6";
import Homepage from "./modules/Homepage";
import Navbar from "./modules/Module-7/MileStone Task/Components/Navbar";
import Home from "./modules/Module-7/MileStone Task/Components/Home";
import Details from "./modules/Module-7/MileStone Task/Components/Details";
import About from "./modules/Module-7/MileStone Task/Components/About";
import DemoApp8 from "./modules/Module-8/ModuleDemo8/DemoApp8";
import Navbar8 from "./modules/Module-8/ModuleTask8/Navbar8";
import Home8 from "./modules/Module-8/ModuleTask8/Home8";
import Details8 from "./modules/Module-8/ModuleTask8/Details8";
import About8 from "./modules/Module-8/ModuleTask8/About8";
import DemoApp9 from "./modules/Module-9/DemoApp9";
import UnoptimizedDashboard from "./modules/Module-9/UnoptimizedApp/UnoptimizedDashboard"
import OptimizedDashboard from "./modules/Module-9/OptimizedApp/OptimizedDashboard"
import VirtualizedDashboard from "./modules/Module-9/VirtualizedApp/VirtualizedDashboard";
import MilestoneApp from './modules/Module-9/MilestoneTask/components/MilestoneApp';
import MemeVerse from './modules/Module-9/MemeVerse/MemeVerse';

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/counterModule?" element={<Homepage />}>
                    <Route index element={<CounterModule />} />
                    <Route path="/productModule" element={<ProductModule />} />
                    <Route path="/timerModule" element={<TimerModule />} />
                    <Route path="/taskManager" element={<TaskManager />} />
                    <Route path="/counterApp" element={<CounterApp />} />
                    <Route path="/practice" element={<Practice />} />
                    <Route path="/modulePractice5" element={<ModulePractice5 />} />
                    <Route path="/moduleApp" element={<ModuleApp />} />
                    <Route path="/modalApp" element={<ModalApp />} />
                    <Route path="/moduleApp6" element={<ModuleApp6 />} />
                    <Route path="/finalApp6" element={<FinalApp6 />} />
                    <Route path="/layout1" element={<Layout1 />} />
                    <Route path="/navbar" element={<Navbar />}>
                        <Route index element={<Navigate to="home" replace />} />
                        <Route path="home" element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="user/:id" element={<Details />} />
                    </Route>
                    <Route path="/demoApp8" element={<DemoApp8 />} />
                    <Route path="/moduleTask8" element={<Navbar8 />}>
                        <Route index element={<Navigate to="home" replace />} />
                        <Route path="home" element={<Home8 />} />
                        <Route path="about" element={<About8 />} />
                        <Route path="user/:id" element={<Details8 />} />
                    </Route>
                    <Route path="/demoApp9" element={<DemoApp9 />}>
                        <Route path="unoptimized" element={<UnoptimizedDashboard />} />
                        <Route path="optimized" element={<OptimizedDashboard />} />
                        <Route path="virtualized" element={<VirtualizedDashboard />} />
                    </Route>
                    <Route path="milestoneTask9" element={<MilestoneApp />} />
                    <Route path="/memeVerse" element={<MemeVerse />} />

                </Route>
            </Routes>
        </>
    );
}